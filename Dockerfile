# ---------- Stage 1: Builder ----------
FROM node:20-alpine AS builder
WORKDIR /app

ARG SERVICE_NAME
ENV SERVICE_NAME=${SERVICE_NAME}

# Install deps
COPY package.json package-lock.json ./
COPY tsconfig.base.json nx.json ./
RUN npm install

# Copy entire monorepo
COPY . .

# ✅ Generate Prisma Client for correct platform
RUN npx prisma generate --schema=./prisma/schema.prisma --binary-target=linux-musl-openssl-3.0.x

# Build the specific service
RUN npx nx build $SERVICE_NAME --configuration=production

# ---------- Stage 2: Runtime ----------
FROM node:20-alpine
WORKDIR /app

ARG SERVICE_NAME
ENV SERVICE_NAME=${SERVICE_NAME}
ENV NODE_ENV=production

# Copy runtime package.json for that service
COPY --from=builder /app/dist/apps/backend/$SERVICE_NAME/package.json ./package.json

# Install only prod deps
RUN npm install --omit=dev

# Copy built code and Prisma schema
COPY --from=builder /app/dist/apps/backend/$SERVICE_NAME/ ./
COPY --from=builder /app/prisma ./prisma

# ✅ Copy precompiled Prisma Client
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

# Optional: Check client exists
RUN ls -la node_modules/.prisma/client

EXPOSE 3000
CMD ["node", "main.cjs"]

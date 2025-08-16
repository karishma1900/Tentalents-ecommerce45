# Stage 1
FROM node:20-alpine AS builder
WORKDIR /app

# Accept service name as a build argument with default fallback
ARG SERVICE_NAME
ENV SERVICE_NAME=${SERVICE_NAME}

# Copy package files and configs for better caching
COPY package.json package-lock.json ./
COPY tsconfig.base.json nx.json ./

# Install dependencies for the monorepo
RUN npm install

# Copy the full monorepo
COPY . .

# Build the specific service using ENV variable
RUN npx nx build $SERVICE_NAME --configuration=production

# Stage 2
FROM node:20-alpine
WORKDIR /app

# Accept build arg again and set env for runtime
ARG SERVICE_NAME
ENV SERVICE_NAME=${SERVICE_NAME}
ENV NODE_ENV=production

# Copy only the service's pruned package.json
COPY --from=builder /app/dist/apps/backend/$SERVICE_NAME/package.json ./package.json

# Install only production dependencies
RUN npm install --omit=dev

# Copy the compiled output
COPY --from=builder /app/dist/apps/backend/$SERVICE_NAME/ ./

# Copy Prisma schema
COPY --from=builder /app/prisma ./prisma

# ✅ Run prisma generate inside container for correct binary
RUN npx prisma generate && ls -la node_modules/.prisma/client

# Expose port
EXPOSE 3000

# Start the service
CMD ["node", "main.cjs"]

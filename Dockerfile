# === Stage 1: Build ===
FROM node:20-alpine AS builder
WORKDIR /app

# Accept service name as a build argument
ARG SERVICE_NAME

# Copy package files and configs for better caching
COPY package.json package-lock.json ./
COPY tsconfig.base.json nx.json ./

# Install dependencies for the monorepo
RUN npm install

# Copy the full monorepo
COPY . .

# Build the specific service
RUN npx nx build ${SERVICE_NAME} --configuration=production

# === Stage 2: Runtime ===
FROM node:20-alpine
WORKDIR /app

# Accept the same build arg again for correct folder paths
ARG SERVICE_NAME
ENV NODE_ENV=production

# Copy only the service's pruned package.json
COPY --from=builder /app/dist/apps/backend/${SERVICE_NAME}/package.json ./package.json
COPY --from=builder /app/dist/apps/backend/${SERVICE_NAME}/ ./

# Install only production dependencies
RUN npm install --omit=dev

# Copy the compiled output
COPY --from=builder /app/dist/apps/${SERVICE_NAME}/ ./

# Copy Prisma schema if required
COPY --from=builder /app/prisma ./prisma

# Expose a generic port (override in Render if needed)
EXPOSE 3000

# Start the service
CMD ["node", "main.js"]

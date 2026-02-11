# Builder
FROM node:24-slim AS builder
RUN apt-get update && apt-get install -y curl ca-certificates && rm -rf /var/lib/apt/lists/*
WORKDIR /usr/src/app
RUN npm install -g pnpm
COPY package*.json pnpm-lock.yaml* ./
RUN pnpm install
COPY . .
RUN pnpm run build

# Production
FROM node:24-slim
WORKDIR /usr/src/app
ENV NODE_ENV=production
RUN npm install -g pnpm
COPY package*.json pnpm-lock.yaml* ./
RUN apt-get update && apt-get install -y curl ca-certificates && rm -rf /var/lib/apt/lists/*
RUN pnpm install
COPY --from=builder /usr/src/app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/index.js"]
# Voice gateway for Fly.io (see fly.toml and src/voice/DEPLOY.md). Runs src/voice/server.ts with tsx; no build step.
FROM node:22-slim
WORKDIR /app
# The lockfile is v6, which needs pnpm 8.
RUN npm install -g pnpm@8
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY tsconfig.json ./
COPY src ./src
COPY data ./data
# Source cases for post-call follow-ups and the operations portal (src/ops).
COPY ["HackatonPublicCases/Property Management", "./HackatonPublicCases/Property Management"]
COPY cases/practice ./cases/practice
ENV NODE_ENV=production PORT=8080 CALLS_DIR=/tmp/calls
EXPOSE 8080
CMD ["node_modules/.bin/tsx", "src/voice/server.ts"]

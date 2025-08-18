FROM node:22-alpine AS builder

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10 --activate

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

FROM node:22-alpine

WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder --chown=node:node /app/.output ./

USER node
EXPOSE 3000

CMD ["node", "server/index.mjs"]
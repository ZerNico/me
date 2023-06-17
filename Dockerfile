FROM node:20-alpine as builder

WORKDIR /app

RUN npm install --global pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build


FROM node:20-alpine

WORKDIR /app
ENV NODE_ENV=production

RUN npm install --global pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --production

COPY --from=builder /app/.next ./.next
COPY ./public ./public
COPY ./next.config.js ./next.config.js

RUN chown -R node:node /app
USER node

EXPOSE 3000

CMD ["pnpm", "start"]

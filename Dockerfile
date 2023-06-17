FROM node:20-alpine as builder

WORKDIR /app

RUN npm install --global pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build


FROM node:20-alpine

WORKDIR /app

RUN npm install --global pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --production

COPY . .
COPY --from=builder /app/.next ./

USER node

EXPOSE 3000

CMD ["pnpm", "start"]

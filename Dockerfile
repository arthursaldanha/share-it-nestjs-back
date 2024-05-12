FROM node:20 AS base

RUN npm i -g pnpm

FROM base AS dependencies

WORKDIR /user/src/app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

FROM base AS build

WORKDIR /user/src/app

COPY . .
COPY --from=dependencies /user/src/app/node_modules ./node_modules

RUN pnpm build
RUN pnpm prune --prod

FROM node:20-alpine3.19 AS deploy

WORKDIR /user/src/app

RUN npm i -g pnpm prisma

COPY --from=build /user/src/app/dist ./dist
COPY --from=build /user/src/app/node_modules ./node_modules
COPY --from=build /user/src/app/package.json ./package.json
COPY --from=build /user/src/app/prisma ./prisma

RUN pnpm prisma generate

EXPOSE 3001

CMD [ "pnpm", "start:prod" ]
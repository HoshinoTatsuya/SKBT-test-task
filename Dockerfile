FROM node:20-alpine AS ms-base
ENV NPM_CONFIG_LOGLEVEL warn
ENV NODE_ENV=production

WORKDIR /app
COPY . .
RUN yarn install
RUN nest build

FROM node:20-alpine
WORKDIR /workspace/dist
ENV NPM_CONFIG_LOGLEVEL warn
ENV NODE_ENV=production

COPY package.json yarn.lock ./
COPY .yarn/ .yarn/
COPY --from=ms-base /app/dist/backend/ .
COPY --from=ms-base /app/node_modules/ ./node_modules/
COPY config ./config

RUN yarn add pg

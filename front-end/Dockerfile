FROM node:21-alpine3.18
WORKDIR /usr/lib

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
COPY tsconfig*.json ./
COPY yarn.lock ./
USER node

RUN yarn install
#COPY . .
COPY --chown=node:node .. .
#COPY . .
CMD ["yarn", "dev"]
EXPOSE 3000

FROM node:21-alpine3.18
#FROM nikolaik/python-nodejs:python3.12-nodejs21
# Install Python and other dependencies
#RUN apk --no-cache add \
#    python3 \
#    python3-dev \
#    make \
#    g++
#RUN  apt-get update
WORKDIR /usr/lib

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
COPY tsconfig*.json ./
COPY yarn.lock ./
USER node

RUN yarn install
COPY ./src ./src
#COPY --chown=node:node .. .
#COPY . .
CMD ["yarn", "start:dev"]
EXPOSE 3000

FROM node:14-alpine as development

WORKDIR /usr/src/app

COPY ./package*.json /usr/src/app

RUN npm install

COPY . .

RUN npm run build

FROM node:14-alpine as production

ARG NODE_ENV=production

ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json /usr/src/app

RUN npm install --only=production

COPY --from=development /usr/src/app/build ./build

CMD ["node", "./build/index.js"]

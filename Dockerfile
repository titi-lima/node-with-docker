FROM node:18.16

WORKDIR /usr/src/app

COPY package.json yarn.loc[k] ./

RUN yarn install

COPY . .

EXPOSE 3001

CMD ["yarn", "dev"]
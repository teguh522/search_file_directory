FROM node:slim

WORKDIR /app/carifile

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn build

CMD ["yarn","start"]
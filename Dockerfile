FROM node:slim

WORKDIR /app/carifile

COPY package*.json ./

RUN yarn install

COPY . .

RUN mkdir /app/carifile/public/files

RUN yarn build

CMD ["yarn","start"]
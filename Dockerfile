FROM node:lts

WORKDIR /usr/src/app

COPY ["package.json", "./"]

RUN yarn 

COPY . .

EXPOSE 5000

CMD yarn start
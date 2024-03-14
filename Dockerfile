FROM node:15 as development

WORKDIR /usr/src/app

COPY package*json .

RUN npm install

copy . . 

RUN npm run build 
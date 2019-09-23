FROM ubuntu:latest
RUN apt-get update && apt-get -y install ghostscript && apt-get clean

FROM node:9-slim
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD ["npm","run","start"]
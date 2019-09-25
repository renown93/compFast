FROM node:9-slim
RUN apt-get update && apt-get -y install ghostscript && apt-get clean
WORKDIR /app
COPY package.json /app
RUN npm install
EXPOSE 5000
COPY . /app
ENTRYPOINT [ "npm" ]
CMD ["run","dev"]
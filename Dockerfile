FROM alpine:latest
RUN apk update
LABEL name="Chella S" email="2chellaa@gmail.com"
RUN apk add nodejs
RUN mkdir /application -p
WORKDIR /application
ADD package.json /application/
RUN apk add npm
RUN npm -v
RUN npm install 
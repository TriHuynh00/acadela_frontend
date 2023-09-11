FROM node:alpine

ARG deployDir=/usr/src/app

RUN mkdir -p $deployDir
WORKDIR $deployDir

RUN npm install -g serve
ADD build $deployDir/build

CMD serve -s build 

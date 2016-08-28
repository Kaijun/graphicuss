
# E-Dicuss
#
# VERSION 0.0.1


FROM alpine

MAINTAINER Kaijun Chen <Kaijun.cn@gmail.com>

ENV ROOT_DIR /e-discuss

#RUN apk add --no-cache zsh

RUN apk add --no-cache nodejs

RUN chmod +x /sbin/dosu && \
  echo http://dl-4.alpinelinux.org/alpine/edge/testing >> /etc/apk/repositories && \
  apk add --no-cache mongodb

ADD . ${ROOT_DIR}

WORKDIR ${ROOT_DIR}

RUN mongod --fork
RUN npm install
RUN npm start

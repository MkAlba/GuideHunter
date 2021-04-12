FROM buildkite/puppeteer:5.2.1 as react-build 

ARG REACT_APP_API_BASE_URL










FROM node:15.14.0-alpine3.13

COPY api /opt/api
WORKDIR /opt/api

RUN npm ci --only--production

EXPOSE 3001

CMD ["npm" , "start"]


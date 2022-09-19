FROM node:latest


WORKDIR /app

ARG SERVER_PORT=${SERVER_PORT}

COPY package.json .

RUN npm install



COPY . .
RUN npm pkg set "proxy"="http://SmartFit-backend:${SERVER_PORT}"
# RUN npm run test


# start app
CMD PORT=${APP_PORT} npm start


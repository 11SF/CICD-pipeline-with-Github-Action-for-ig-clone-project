FROM node:16.3.0-alpine

COPY . /user/app
WORKDIR /user/app

RUN npm install
EXPOSE 3000

CMD ["npm", "start"]
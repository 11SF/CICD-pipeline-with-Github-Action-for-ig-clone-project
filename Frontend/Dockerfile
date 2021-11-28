FROM node:alpine

COPY ./Frontend /user/app
WORKDIR /user/app

RUN npm install
EXPOSE 3000

CMD ["npm", "start"]
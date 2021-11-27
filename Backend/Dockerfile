FROM node:alpine

COPY . /user/app
WORKDIR /user/app

RUN npm install
EXPOSE 3001

CMD ["npm", "start"]
FROM alpine:3.14

COPY . /user/app
WORKDIR /user/app

RUN npm install
EXPOSE 3000

CMD ["npm", "start"]
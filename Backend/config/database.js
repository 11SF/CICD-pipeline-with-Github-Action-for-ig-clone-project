const mongoose = require("mongoose");
require("dotenv").config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

const mongo_url = `mongodb+srv://${username}:${password}@cluster0.vxyrb.mongodb.net/${dbName}?retryWrites=true&w=majority`;
mongoose.Promise = global.Promise;
mongoose.connect(mongo_url, {useNewUrlParser: true}).then(
  () => {
    console.log("[success] : connected to the database ");
  },
  error => {
    console.log("[failed] task 2 " + mongo_url + " " + error);
    process.exit();
  }
);

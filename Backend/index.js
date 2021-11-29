const express = require("express");
let cors = require("cors");
let db = require("./config/database");
const app = express();
var path = require("path");

require("dotenv").config();
app.use(cors());
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Methods",
//     "POST, GET, PUT, PATCH, DELETE, OPTIONS"
//   );
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Content-Type, Option, Authorization,x-access-token"
//   );
//   next();
// });
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/user", require("./api/user"));
app.use("/api/post", require("./api/post"));

app.listen(process.env.PORT, () => {
  console.log(`Server is running at port ${process.env.PORT}`);
});

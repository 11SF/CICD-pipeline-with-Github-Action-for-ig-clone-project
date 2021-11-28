const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  username: { type: String, required: true },
  owner_id: { type: String, required: true },
  post_id: { type: String, required: true },
  text: { type: String, default: "" },
  timestamp: { type: Date },
});

module.exports = mongoose.model("Comment", CommentSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  username: { type: String, required: true },
  owner_id: { type: String, required: true },
  caption: { type: String, default: "" },
  like_count: [{ type: String }],
  timestamp: { type: Date },
  imagePath: { type: String, required: true },
});

module.exports = mongoose.model("Post", PostSchema);

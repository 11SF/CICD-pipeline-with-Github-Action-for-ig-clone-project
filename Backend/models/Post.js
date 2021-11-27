const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  username: {type: String, required: true},
  owner_id: {type: String, required: true},
  caption: {type: String, default: ""},
  comments: [
    {
      username: {type: String, required: true},
      owner_id: {type: String, required: true},
      text: {type: String, default: ""},
      timestamp: {type: Date},
    },
  ],
  timestamp: {type: Date},
  imagePath: {type: String, required: true},
});

module.exports = mongoose.model("Post", PostSchema);

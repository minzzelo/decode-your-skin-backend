const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const threadPostSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  threadId: {
    type: String,
    required: true,
  },
});

const ThreadPost = mongoose.model("ThreadPost", threadPostSchema);
module.exports = ThreadPost;

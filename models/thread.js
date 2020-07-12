const mongoose = require("mongoose");
const ThreadPost = require("./threadPost");

const Schema = mongoose.Schema;

const threadSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  //   threadPosts: {
  //     type: [ThreadPost],
  //     required: true,
  //   },

  threadPosts: [{ type: ThreadPost, ref: "ThreadPost" }],
});

const Thread = mongoose.model("Thread", threadSchema);
module.exports = Thread;

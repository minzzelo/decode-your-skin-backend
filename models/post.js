const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    user: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    products: {
      type: String,
      required: true,
    },
    skin_condition: {
      type: String,
      required: true,
    },
  },
  { collection: "post" }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;

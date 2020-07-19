const mongoose = require("mongoose");
const moment = require('moment');

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

  date: {
    type: String, 
    default: moment().format('MMMM Do YYYY, h:mm:ss a')
  }
  
});

const ThreadPost = mongoose.model("ThreadPost", threadPostSchema);
module.exports = ThreadPost;

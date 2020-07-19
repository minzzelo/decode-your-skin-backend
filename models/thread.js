const mongoose = require("mongoose");
const moment = require('moment');

const Schema = mongoose.Schema;

const threadSchema = new Schema({

  user : {
      type : String, 
  }, 
 
  title: {
    type: String,
    required: true,
  },

  comment: {
    type: String, 
    required: true
  }, 

  threadPosts: [{ 
    type: Schema.Types.ObjectId, 
    ref: "ThreadPost" 
  }],
  
  date: {
    type: String, 
    default: moment().format('MMMM Do YYYY, h:mm:ss a')
  }

});

const Thread = mongoose.model("Thread", threadSchema);
module.exports = Thread;

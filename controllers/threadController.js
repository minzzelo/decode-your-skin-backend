const Thread = require("../models/thread");
const ThreadPost = require("../models/threadPost");
const User = require("../models/user");

exports.createThread = async (req, res) => {
  const user = req.body.user;
  const title = req.body.title;
  const comment = req.body.comment;

  console.log(user);

  const newThread = new Thread({
    user, title, comment
  });

  await newThread.save()
                 .then((res) => res.status(200).send("Thank you for posting a thread!"))
                 .catch((error) => res.status(400).send("ERROR: " + error));
};


exports.getAllThreads = async (req, res) => {
  const threads = await Thread.find({}); //get all threads
  return res.status(200).send({success: true, threads});
}

exports.deleteThread = (req, res) => {
  const id = req.body.id;

  Thread.findByIdAndRemove(id, (error, doc) => {
    if (error) throw err;
    return res.status(200).send({
      success: true,
      data: doc,
    });
  });
};


exports.getThread = async (req, res) => {
  const threadId = req.body.id;
  const thread = await Thread.findById(threadId)
                             .populate("threadPosts");
                       

  console.log(thread);

  return res.status(200).json(thread);

  
}
const ThreadPost = require("../models/threadPost");
const Thread = require("../models/thread");


exports.createThreadPost = async (req, res) => {

 
  
  const user = req.body.user;
  const comment = req.body.comment;
  const threadId = req.body.threadId;

  const newThreadPost = new ThreadPost({
    user, comment
  });


  const mainThread = await Thread.findOne({_id : threadId});

  console.log(mainThread);

  newThreadPost.save();

  mainThread.threadPosts.push(newThreadPost);

  console.log("Done");

  await mainThread.save()
            .then(() => res.status(200).json(newThreadPost))
            .catch((err) => res.status(400).send(err));
  
}


exports.deleteThreadPost = async (req, res) => {
  const threadPostId = req.body.id;

  ThreadPost.findByIdAndDelete(threadPostId)
            .then((res) => res.status(200).send("Comment Successfully Deleted!"))
            .catch((error) => res.status(400).send(error));
}


exports.getAllThreadPosts = async (req, res) => {
  const threadId = req.body.id;
  const thread = await Thread.findById(threadId)
                            .populate("threadposts");

  return res.status(200).json(thread.threadPosts);
}
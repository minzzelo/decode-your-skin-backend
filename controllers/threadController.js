const Thread = require("../models/thread");
const ThreadPost = require("../models/threadPost");

exports.createThread = async (req, res) => {
  const user = req.body.user;
  const title = req.body.title;
  const comment = req.body.comment;

  const newThread = new Thread({
    title,
  });

  const threadId = newThread._id;

  // Initialize thread
  const newThreadPost = new ThreadPost({ user, comment, threadId });

  await newThreadPost
    .save()
    .then((res) => newThread.threadPosts.push(res))
    .catch((error) => res.status(400).send("ERROR : " + error));

  await newThread
    .save()
    .then(() => {
      res.status(200).send("Thank you for posting a thread!");
    })
    .catch((error) => res.status(400).send("ERROR : " + error));
  console.log(newThread);
};

exports.getAllThreads = async (req, res) => {
  const threads = await Thread.find().populate("threadPosts");
  return res.status(200).send({ success: true, threads });
};

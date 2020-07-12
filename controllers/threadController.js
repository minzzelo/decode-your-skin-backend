const Thread = require("../models/thread");
const ThreadPostController = require("./threadPostController");
const ThreadPost = require("../models/threadPost");

exports.createThread = (req, res) => {
  const user = req.body.user;
  const title = req.body.title;
  const comment = req.body.comment;

  const newThread = new Thread({
    title,
  });

  const threadId = newThread._id;

  // Initialize thread
  const newThreadPost = new ThreadPost({ user, comment, threadId });
  newThreadPost
    .save()
    .catch((error) => res.status(400).send("ERROR : " + error));
  newThread.threadPosts.push(newThreadPost);

  newThread
    .save()
    .then(() => {
      res.status(200).send("Thank you for posting a thread!");
    })
    .catch((error) => res.status(400).send("ERROR : " + error));
};

exports.getAllThreads = (req, res) => {
  Thread.find({}).then((threads) => {
    if (!threads) {
      return res.status(400).send("No Posts");
    } else {
      return res.status(200).send({ success: true, threads });
    }
  });
};

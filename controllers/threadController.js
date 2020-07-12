const Thread = require("../models/Thread");
const threadPostController = require("./threadPostController");

exports.createThread = (req, res) => {
  const user = req.body.user;
  const title = req.body.title;
  const comment = req.body.comment;

  const newThread = new Thread({
    user,
    title,
  });

  const newThreadPost = threadPostController.createThreadPost({
    user,
    comment,
  });

  newThread.threadPosts.push(newThreadPost);

  newThread
    .save()
    .then(() => res.status(200).send("Thank you for posting!"))
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

exports.deletePost = (req, res) => {
  const id = req.body.id;

  Post.findByIdAndRemove(id, (error, doc) => {
    if (error) throw err;
    return res.status(200).send({
      success: true,
      data: doc,
    });
  });
};

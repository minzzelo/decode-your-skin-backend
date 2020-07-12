const ThreadPost = require("../models/threadPost");

exports.createThreadPost = (req, res) => {
  const user = req.body.user;
  const comment = req.body.comment;

  const newThreadPost = new ThreadPost({
    user,
    comment,
  });

  newThreadPost
    .save()
    .then(() => res.status(200).send(newThreadPost))
    .catch((error) => res.status(400).send("ERROR : " + error));
};

// exports.getThreadPosts = (req, res) => {
//   const threadId = req.body.threadId;

//   if (!threadId) {
//     return res.status(400).send("No thread!");
//   }

//   Post.find({ id: threadId }).then((posts) => {
//     if (!posts) {
//       return res.status(400).send("No Posts");
//     } else {
//       return res.status(200).send({ success: true, posts });
//     }
//   });
// };

exports.deleteThreadPost = (req, res) => {
  const id = req.body.id;

  Post.findByIdAndRemove(id, (error, doc) => {
    if (error) throw err;
    return res.status(200).send({
      success: true,
      data: doc,
    });
  });
};

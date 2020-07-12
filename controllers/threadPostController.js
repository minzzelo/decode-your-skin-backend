const ThreadPost = require("../models/threadPost");
const thread = require("../models/thread");

exports.createThreadPost = (req, res) => {
  const user = req.body.user;
  const comment = req.body.comment;
  const threadId = req.body.threadId;

  const newThreadPost = new ThreadPost({
    user,
    comment,
    threadId,
  });
  newThreadPost
    .save()
    .then(() => res.status(200).send("Thank you for posting a thread post!"))
    .catch((error) => res.status(400).send("ERROR : " + error));
};

// exports.deleteThreadPost = (req, res) => {
//   const id = req.body.id;

//   Post.findByIdAndRemove(id, (error, doc) => {
//     if (error) throw err;
//     return res.status(200).send({
//       success: true,
//       data: doc,
//     });
//   });
// };

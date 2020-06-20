const Post = require("../models/post");

exports.createPost = (req, res) => {
  console.log(req.body);

  const user = req.body.user;
  const title = req.body.title;
  const description = req.body.description;
  const newPost = new Post({ user, title, description });

  newPost
    .save()
    .then(() => res.status(200).send("Thank you for posting!"))
    .catch((error) => res.status(400).send("ERROR : " + error));
};

exports.getPost = (req, res) => {
  console.log(`Getting posts`);
  const user = req.body.user;

  if (!user) {
    return res.status(400).send("No user!");
  }

  Post.find({ user }).then((post) => {
    if (!post) {
      return res.status(400).send("No Posts");
    } else {
      return res.status(200).send({ success: true, post });
    }
  });
};

exports.deletePost = (req, res) => {
  console.log(`Deleting post`);
  const id = req.body.id;

  Post.findByIdAndRemove(id, (error, doc) => {
    if (error) throw err;
    return res.status(200).send({
      success: true,
      data: doc,
    });
  });
};

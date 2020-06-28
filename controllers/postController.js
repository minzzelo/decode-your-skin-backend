const Post = require("../models/post");

exports.createPost = (req, res) => {
  const user = req.body.user;
  const date = req.body.date;
  const title = req.body.title;
  const description = req.body.description;
  const products = req.body.products;
  const skin_condition = req.body.skin_condition;

  const newPost = new Post({
    user,
    date,
    title,
    description,
    products,
    skin_condition,
  });

  newPost
    .save()
    .then(() => res.status(200).send("Thank you for posting!"))
    .catch((error) => res.status(400).send("ERROR : " + error));
};

exports.getPost = (req, res) => {
  const user = req.body.user;

  if (!user) {
    return res.status(400).send("No user!");
  }

  Post.find({ user }).then((posts) => {
    if (!posts) {
      return res.status(400).send("No Posts");
    } else {
      return res.status(200).send({ success: true, posts });
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

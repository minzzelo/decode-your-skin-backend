const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");

const users = require("./routes/users");
const products = require("./routes/products");
const searchBar = require("./routes/search");
const post = require("./routes/post");
const product = require("./routes/products");
const thread = require("./routes/thread");
const threadPost = require("./routes/threadPost");

const app = express(); //create the express server

require("dotenv").config({ path: ".env" });
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const db = process.env.DB;
mongoose.connect(db, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

//passport middleware
app.use(passport.initialize());

//passport config
require("./config/passport")(passport);

//Routes
app.use("/users", users);
app.use("/products", products);
app.use("/search", searchBar);
app.use("/post", post);
app.use("/saveProduct", product);
app.use("/thread", thread);
app.use("/threadpost", threadPost);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

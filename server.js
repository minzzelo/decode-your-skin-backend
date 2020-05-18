const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config({path:".env"});

const app = express(); //create the express server

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const db = process.env.DB;
mongoose.connect(db, {useNewUrlParser: true, useCreateIndex: true});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const usersRouter = require('./routes/users');

app.use('/users',  usersRouter);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})






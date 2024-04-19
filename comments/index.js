const express = require("express");
const app = express();
const { randomBytes } = require("crypto");
const bodyParser = require('body-parser');

const cors = require("cors");

app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParser.json());


const comments = {};

app.get("/health", (req, res) => {
  res.status(200).send("ok");
});

app.get("/posts/:postId/comments", (req, res) => {
  const { postId } = req.params;

  if (!comments[postId] || comments[postId].length === 0) {
    res.status(200).send([]); // Send an empty array if no comments or postId doesn't exist
  } else {
    const postComments = comments[postId];
    res.status(200).send(postComments);
  }
});

app.post("/posts/:postId/comments", (req, res) => {
  const { postId } = req.params;
  const { content } = req.body;
  console.log('req.body', req.body);
  const id = randomBytes(4).toString("hex");


  if (!comments[postId]) {
    comments[postId] = []; // Initialize the array if it doesn't exist
  }
  const comment = {id,content}
  comments[postId].push(comment); // Push the content into the array

  console.log('comments', comments);

  res.status(200).send(comments[postId]);
});

app.listen(4001, () => {
  console.log("listening on http://localhost:4001");
});

const express = require("express");
const Post = require("../models/post");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Posts page");
});
// Gets all the posts
router.get("/all", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
    console.log(posts);
  } catch (err) {
    res.send({ message: err });
  }
  res.send("Queries all posts");
});

// posts a post
router.post("/", (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
  });
  post
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
  console.log(post);
});

// Get a specific post
router.get("/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.json(post);
  } catch (err) {
    res.json(err);
  }
});

// Delete a specific post.
router.delete("/:postId", async (req, res) => {
  try {
    const removedPost = await Post.deleteOne({
      _id: req.params.postId,
    });
    res.json(removedPost);
  } catch (err) {
    res.json(err);
  }
});

// Update a post
router.patch("/:postId", async (req, res) => {
  try {
    const updatedPost = await Post.updateOne(
      { _id: req.params.postId },
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
        },
      }
    );
    res.json(updatedPost);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;

const express = require("express");
const { isValidObjectId } = require("mongoose");
const User = require("../models/user");

const router = express.Router();

// Get all users.
router.get("/all", async (req, res) => {
  try {
    const userPosts = await User.find();
    res.json(userPosts);
  } catch (err) {
    res.json(err);
  }
});

// Get specific user.
router.get("/:userId", async (req, res) => {
  try {
    const id = req.params.userId;
    console.log(id);
    const user = await User.findById(id);
    res.json(user);
  } catch (err) {
    res.json(err);
  }
});

// Create user
router.post("/", (req, res) => {
  const userPost = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  });
  userPost
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
  console.log(userPost);
});
// Update specific user.
router.patch("/:userId", async (req, res) => {
  try {
    const userPost = await User.updateOne(
      { _id: req.params.userId },
      {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
        },
      }
    );
    res.json(userPost);
  } catch (err) {
    res.json(err);
  }
});

// Delete specific user
router.delete("/:userId", async (req, res) => {
  try {
    const deletedUser = await User.deleteOne({ _id: req.params.userId });
    res.json(deletedUser);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;

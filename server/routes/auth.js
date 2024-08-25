const express = require("express");
const Post = require("../model/User");
const router = express.Router();

// GET /posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /posts/:id
router.get("/:id", getPost, (req, res) => {
  res.json(res.post);
});

// POST /posts
router.post("/", async (req, res) => {
  const excerptLength = 600;
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    excerpt:
      req.body.excerpt || req.body.content.substring(0, excerptLength) + "...",
  });

  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /posts/:id
router.put("/:id", getPost, async (req, res) => {
  if (req.body.title != null) {
    res.post.title = req.body.title;
  }
  if (req.body.content != null) {
    res.post.content = req.body.content;
  }
  if (req.body.excerpt == null) {
    res.post.excerpt = req.body.content.substring(0, 600) + "...";
  } else {
    res.post.excerpt = req.body.excerpt;
  }

  try {
    const updatedPost = await res.post.save();
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /posts/:id
router.delete("/:id", getPost, async (req, res) => {
  try {
    const result = await Post.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json({ message: "Post deleted" });
  } catch (err) {
    console.error("Error deleting post:", err.message);
    res.status(500).json({ message: err.message });
  }
});

async function getPost(req, res, next) {
  let post;
  try {
    post = await Post.findById(req.params.id);
    if (post == null) {
      return res.status(404).json({ message: "Cannot find post" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.post = post;
  next();
}

module.exports = router;

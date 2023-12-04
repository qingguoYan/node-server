const express = require("express");
const router = express.Router();
const asyncMiddleware = require("../middleware/async");
const auth = require("../middleware/auth");
const { Post } = require("../model/post");

router.post(
  "/save",
  auth,
  asyncMiddleware(async (req, res) => {
    const { content, title, desc } = req.body;
    const user = req.user;
    const post = new Post({
      content,
      title,
      desc,
      create_time: Date.now(),
      user_id: user._id,
    });
    await post.save();
    res.send({ data: true });
  })
);

router.put(
  "/update",
  auth,
  asyncMiddleware(async (req, res) => {
    console.log(req.body);
    const { id, content, title, desc } = req.body;
    await Post.findByIdAndUpdate(id, {
      content,
      title,
      desc,
      create_time: Date.now(),
    });
    res.send({ data: true });
  })
);

router.get(
  "/list",
  auth,
  asyncMiddleware(async (req, res) => {
    const { title } = req.query;
    if (title) {
      Post.find({ title: { $regex: title, $options: "i" } }, (err, posts) => {
        if (!err) {
          res.send({ data: posts });
        } else {
          res.status(500).send({ error: "数据库错误" });
        }
      });
    } else {
      const list = await Post.find();
      res.send({ data: list });
    }
  })
);

router.get(
  "/get",
  auth,
  asyncMiddleware(async (req, res) => {
    const { id } = req.query;
    const post = await Post.findById(id);
    res.send({ data: post });
  })
);

router.delete(
  "/delete",
  auth,
  asyncMiddleware(async (req, res) => {
    const { id } = req.query;
    await Post.findByIdAndDelete(id);
    res.send({ data: true });
  })
);

module.exports = router;

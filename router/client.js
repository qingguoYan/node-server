const express = require("express");
const router = express.Router();
const asyncMiddleware = require("../middleware/async");
const { Post } = require("../model/post");

router.get(
  "/list",
  asyncMiddleware(async (req, res) => {
    const list = await Post.find();
    const _list = list.map((item) => ({
      title: item.title,
      desc: item.desc,
      create_time: item.create_time,
      _id: item.id,
    }));
    res.send({ data: _list });
  })
);

module.exports = router;

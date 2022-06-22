const express = require("express");
const router = express.Router();
const asyncMiddleware = require("../middleware/async");
const auth = require("../middleware/auth");
const { Editor } = require("../model/editor");

router.post(
  "/save",
  auth,
  asyncMiddleware(async (req, res) => {
    const { content, title, time } = req.body;
    const editor = new Editor({ content, title, time });
    await editor.save();
    res.send({ data: "success" });
  })
);

router.put(
  "/update",
  auth,
  asyncMiddleware(async (req, res) => {
    const { id, content, title, time } = req.body;
    await Editor.findByIdAndUpdate(id, { content, title, time });
    res.send({ data: "success" });
  })
);

router.get(
  "/list",
  auth,
  asyncMiddleware(async (req, res) => {
    const list = await Editor.find();
    res.send({ data: list });
  })
);

router.get(
  "/get",
  auth,
  asyncMiddleware(async (req, res) => {
    const { id } = req.query;
    const editor = await Editor.findById(id);
    res.send({ data: editor });
  })
);

module.exports = router;

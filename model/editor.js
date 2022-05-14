const mongoose = require("mongoose");

const scheme = new mongoose.Schema({
  content: { type: String, required: true },
  title: { type: String, required: true },
});

const Editor = mongoose.model("Editor", scheme);

exports.Editor = Editor;

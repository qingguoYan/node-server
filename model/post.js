const mongoose = require("mongoose");

const scheme = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  content: { type: String, required: true },
  title: { type: String, required: true },
  create_time: { type: Number, required: true },
  desc: { type: String, required: true },
});

const Post = mongoose.model("Post", scheme);

exports.Post = Post;

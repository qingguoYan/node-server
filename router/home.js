const express = require("express");
const _ = require("lodash");
const router = express.Router();
const asyncMiddleware = require("../middleware/async");
const auth = require("../middleware/auth");
const { User } = require("../model/user");

router.get(
  "/me",
  auth,
  asyncMiddleware(async (req, res) => {
    const id = req.user._id;
    const user = await User.findById(id);
    res.send({ data: _.pick(user, ["_id", "username", "email"]) });
  })
);

module.exports = router;

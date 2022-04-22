const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validate } = require("../model/user");
const asyncMiddleware = require("../middleware/async");
const router = express.Router();

router.post(
  "/",
  asyncMiddleware(async (req, res) => {
    const { email, username, password } = req.body;
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).send({ error: "User already register" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    user = new User({ email, username, password: hashed });
    await user.save();
    const token = user.generateAuthToken();
    return res.cookie("x-auth-token", token).end();
  })
);

module.exports = router;

const express = require("express");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const { User } = require("../model/user");
const auth = require("../middleware/auth");
const asyncMiddleware = require("../middleware/async");

const router = express.Router();

const validate = (user) => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(user);
};

router.post(
  "/",
  asyncMiddleware(async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ error: "Invalid email or password" });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).send({ error: "Invalid email or password" });
    }
    const token = user.generateAuthToken();
    return res.cookie("x-auth-token", token).end();
  })
);

router.get(
  "/logout",
  auth,
  asyncMiddleware(async (req, res) => {
    return res.clearCookie("x-auth-token").end();
  })
);

module.exports = router;

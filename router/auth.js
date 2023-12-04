const express = require("express");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const { User } = require("../model/user");
const auth = require("../middleware/auth");
const asyncMiddleware = require("../middleware/async");

const router = express.Router();

const validate = (user) => {
  const schema = Joi.object({
    username: Joi.string().min(5).max(30).required(),
    password: Joi.string().min(5).max(30).required(),
  });
  return schema.validate(user);
};

// 登录
router.post(
  "/",
  asyncMiddleware(async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }
    const { username, password } = req.body;
    let user = await User.findOne({ username });
    if (!user) {
      return res.status(400).send({ error: "用户不存在" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).send({ error: "密码错误" });
    }
    const token = user.generateAuthToken();
    return res
      .cookie("x-auth-token", token, { httpOnly: true })
      .send({ data: true })
      .end();
  })
);

// 退出
router.get(
  "/logout",
  auth,
  asyncMiddleware(async (req, res) => {
    return res.clearCookie("x-auth-token").send({ data: true }).end();
  })
);

module.exports = router;

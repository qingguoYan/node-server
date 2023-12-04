const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  const token = req.cookies["x-auth-token"];
  if (!token) {
    return res.status(401).send({ error: "没有访问权限,请重新登录!" });
  }
  try {
    const decode = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decode;
    next();
  } catch (error) {
    return res.status(400).send({ error: "无效的token令牌" });
  }
};

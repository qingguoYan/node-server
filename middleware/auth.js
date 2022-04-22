const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  const token = req.cookies["x-auth-token"] || req.headers["x-auth-token"];
  if (!token) {
    return res.status(401).send("Access defind. No token provide.");
  }
  try {
    const decode = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decode;
    next();
  } catch (error) {
    return res.status(400).send("Invalid token.");
  }
};

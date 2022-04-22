const cookieParser = require("cookie-parser");
const express = require("express");
const morgan = require("morgan");
const users = require("../router/users");
const auth = require("../router/auth");
const home = require("../router/home");
const error = require("../middleware/error");
const logger = morgan("tiny");

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Headers", "Content-Type,x-auth-token");
    res.header("Access-Control-Expose-Headers", "*");
    next();
  });
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(logger);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/api/home", home);
  app.use(error);
};

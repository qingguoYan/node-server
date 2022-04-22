const mongoose = require("mongoose");
const winston = require("winston");

module.exports = () => {
  mongoose.connect("mongodb://localhost:27017/yqg").then(() => {
    winston.info("连接数据库成功...");
  });
};

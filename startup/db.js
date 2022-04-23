const mongoose = require("mongoose");

module.exports = () => {
  mongoose.connect("mongodb://localhost:27017/yqg").then(() => {
    console.log("连接数据库成功...");
  });
};

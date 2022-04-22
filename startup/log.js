require("winston-mongodb");
const winston = require("winston");

module.exports = () => {
  process.on("uncaughtException", (error) => {
    winston.error(error.message, error);
    setTimeout(() => {
      process.exit(1);
    }, 1000);
  });
  process.on("unhandledRejection", (error) => {
    winston.error(error.message, error);
    setTimeout(() => {
      process.exit(1);
    }, 1000);
  });
  winston.configure({
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({
        name: "info-file",
        filename: "filelog-info.log",
        level: "info",
      }),
      new winston.transports.File({
        name: "error-file",
        filename: "filelog-error.log",
        level: "error",
      }),
    ],
  });
  winston.add(winston.transports.MongoDB, {
    db: "mongodb://localhost:27017/yqg",
  });
};

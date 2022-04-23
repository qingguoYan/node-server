require("winston-mongodb");
const winston = require("winston");
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: "logger.log" }),
    new winston.transports.MongoDB({
      db: "mongodb://localhost:27017/yqg",
      options: {
        useUnifiedTopology: true,
      },
    }),
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.prettyPrint()
  ),
});
const log = () => {
  process.on("uncaughtException", (error) => {
    logger.log({
      level: "error",
      message: error,
    });
    setTimeout(() => {
      process.exit(1);
    }, 1000);
  });
  process.on("unhandledRejection", (error) => {
    logger.log({
      level: "error",
      message: error,
    });
    setTimeout(() => {
      process.exit(1);
    }, 1000);
  });
};

module.exports = {
  logger,
  log,
};

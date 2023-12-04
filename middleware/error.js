const { logger } = require("../startup/log");
module.exports = (error, req, res, next) => {
  logger.log({
    level: "error",
    message: error,
  });
  res.status(500).send({ error: JSON.stringify(error) });
};

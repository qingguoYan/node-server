const winston = require("winston");
const express = require("express");
const app = express();
require("./startup/log")();
require("./startup/config")();
require("./startup/db")();
require("./startup/routes")(app);

const port = 8000;
app.listen(port, () => {
  winston.info(`serve launch success 😄,port ${port}`);
});

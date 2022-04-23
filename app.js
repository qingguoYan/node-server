const express = require("express");
const { log } = require("./startup/log");

const app = express();
log();
require("./startup/config")();
require("./startup/db")();
require("./startup/routes")(app);

const port = 8000;
app.listen(port, () => {
  console.log(`serve launch success 😄,port ${port}`);
});

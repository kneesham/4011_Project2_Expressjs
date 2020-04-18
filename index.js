const express = require("express");
const v1Router = require("./routes/v1/v1Routes");
const v2Router = require("./routes/v2/v2Routes");
const logger = require("./lib/middleware/logger");



const app = express();

app.use(logger);
app.use("/v1", v1Router);
app.use("/v2", v2Router);

const port = 3000;
app.listen(port);


console.log("listening on port: " + port);
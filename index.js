const express = require("express");
const v1Router = require("./routes/v1Routes");

const app = express();

app.use(v1Router);


const port = 3000;
app.listen(port);


console.log("listening on port: " + port);
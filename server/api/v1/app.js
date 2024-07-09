const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

const routes = require("./routes");

const app = express();

// third-party middlewares
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello! From Learnaz Hub Server\n");
});

// Use routes
app.use("/api/v1", routes);

module.exports = app;

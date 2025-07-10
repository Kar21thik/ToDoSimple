const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bmiRoutes = require("./routes/bmiRoutes");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/api/bmi", bmiRoutes);

module.exports = app;

const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const compression = require("compression");
const helmet = require("helmet");
const mongoose = require("mongoose");

mongoose.connect(
    "mongodb://localhost/spotifyApp",
    { useNewUrlParser: true },
    function(err) {
      if (err) throw err;
      console.log("Connected to Database");
    }
  );

const app = express();
const search = require("./controllers/search_controller").query;

app.use(helmet());
app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(compression());
app.use(express.static("public"));

app.use("/api", search);

app.get("*", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(5000);
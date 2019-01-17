var express = require("express");
var logger = require("morgan");
var cors = require("cors");
var bodyParser = require("body-parser");
var compression = require("compression");
var helmet = require("helmet");
var mongoose = require("mongoose");

mongoose.connect(
    "mongodb://localhost/spotifyApp",
    { useNewUrlParser: true },
    function(err) {
      if (err) throw err;
      console.log("Connected to Database");
    }
  );

var app = express();

app.use(helmet());
app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(compression());
app.use(express.static("public"));

app.use("/api/search", require("./routes/searchRoute"));

app.get("*", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(5000);
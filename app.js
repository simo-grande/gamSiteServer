var express = require("express");
const cors = require("cors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
// const mongoose = require("mongoose");

/**--Connecting to mongoose-- */
const MongoClient = require("mongodb").MongoClient;
const client = new MongoClient(
  "mongodb+srv://smerhay:Simo07156289@cluster0.jyqn5.mongodb.net/test",
  { useUnifiedTopology: true }
);
let connection;

var gamesRouter = require("./routes/games");
var usersRouter = require("./routes/users");
var authRouter = require('./routes/auth')

var app = express();
app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", (req, res, next) => {
  if (!connection) {
    // connect to database
    client.connect(function (err) {
      connection = client.db("gaming_site");
      req.db = connection;
      console.log("Db connected succesfully !");
      next();
    });
  } else {
    //
    req.db = connection;
    next();
  }
});

app.use("/games", gamesRouter);
app.use("/users", usersRouter);
app.use('/auth', authRouter)

module.exports = app;

app.listen(3000, (req, res) => {
  console.log("Connected to port 3000 :");
});

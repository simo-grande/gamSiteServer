var express = require('express');
var router = express.Router();

/* GET All games. */
router.get("/", (req, res) => {
  req.db
    .collection("games")
    .find()
    .toArray((err, data) => {
      res.json({
        status: "success",
        data: data,
      });
    });
});

/* Post new game schedule. */
router.post("/", function (req, res, next) {
  const payload = {
    game_name: req.body.game_name,
    no_players: req.body.no_players,
    status: true,
    schedule_type: req.body.schedule_type,
    date: req.body.date,
    time: req.body.time,
    userId: req.body.userId
  }
  req.db
    .collection("games")
    .insertOne(payload)
    .then((data) => {
      res.json({ status: "success" });
    });
});

module.exports = router;

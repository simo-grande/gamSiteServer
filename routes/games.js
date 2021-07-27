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
    pic_url: req.body.pic_url,
    no_players: req.body.no_players,
    status: true,
    schedule_type: req.body.schedule_type,
    date: req.body.date,
    time: req.body.time,
    userId: req.body.userId
  }

  req.db
    .collection("games")
    .findOne({ userId: req.body.userId })
    .then((doc) => {
      if (doc) {
        res.json({ status: "already posted" });
      } else {
        req.db
          .collection("games")
          .insertOne(payload)
          .then((data) => {
            res.json({ status: "success" });
          });
      }
    });





});

module.exports = router;

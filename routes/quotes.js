var express = require("express");
var router = express.Router();
const { ObjectID } = require("bson");

router.post("/", function (req, res, next) {
    req.db
        .collection("quotes")
        .findOne({
            gameId: req.body.gameId,
            userId: req.body.userId,
        })
        .then((doc) => {
            if (doc) {
                res.json({ status: "quote exists" });
            } else {
                req.db
                    .collection("quotes")
                    .insertOne(req.body)
                    .then((data) => {
                        res.json({ status: "success" });
                    });
            }
        });
});

/**--Your Quotes-- */
router.get("/:userId", (req, res) => {
    let temp = [];
    req.db
        .collection("quotes")
        .find({ userId: req.params.userId })
        .toArray((err, data) => {
            if (data) {
                data.forEach((element) => {
                    req.db
                        .collection("games")
                        .find({ _id: new ObjectID(element.gameId) })
                        .project({ game_name: 1, date: 1, time: 1, _id: 0 })
                        .toArray((err, data1) => {
                            temp.push(data1[0]);
                        });
                });
                setTimeout(() => {
                    res.json({ status: "success", data: temp });
                }, 500);
            }
        });
});

module.exports = router;

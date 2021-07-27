var express = require("express");
var router = express.Router();

router.post("/", function (req, res, next) {

    req.db
        .collection("quotes")
        .findOne({
            gameId: req.body.gameId,
            userId: req.body.userId
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

module.exports = router;
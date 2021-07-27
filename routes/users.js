const { ObjectID } = require("bson");
var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", (req, res) => {
  req.db
    .collection("users")
    .find()
    .toArray((err, data) => {
      res.json({
        status: "success",
        data: data,
      });
    });
});

/**--Get User for Profile */
router.get("/:id", (req, res) => {
  req.db
    .collection("users")
    .findOne({ _id: new ObjectID(req.params.id) })
    .then((data) => {
      res.json({ result: "success", data: data });
    });
});

module.exports = router;

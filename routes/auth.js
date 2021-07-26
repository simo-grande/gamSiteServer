const express = require('express');
const router = express.Router();

const jwtManager = require('../jwt/jwtManager');

router.post("/login", (req, res) => {
    req.db
        .collection("users")
        .findOne({ email: req.body.email })
        .then((data) => {
            if (!data) throw new Error();
            if (data && req.body.password === data.password) {
                const payload = {};
                payload.email = data.email;
                payload.id = data._id;
                const token = jwtManager.generate(payload);
                res.json({ email: data.email, id: data._id, result: token });
            } else throw new Error();
        })
        .catch((err) => {
            res.json("error");
        });
});

router.post("/signup", (req, res) => {

    req.db
        .collection("users")
        .findOne({ email: req.body.email })
        .then((doc) => {
            if (doc) {
                res.json({ status: "exists" });
            } else {
                req.db
                    .collection("users")
                    .insertOne(req.body)
                    .then((data) => {
                        res.json({ status: "success" });
                    }).catch(err => {
                        res.json(err)
                    });
            }
        });
});


module.exports = router;
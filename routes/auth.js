const express = require('express');
const router = express.Router();

const jwtManager = require('../jwt/jwtManager');

router.post('/', function (req, res, next) {
    req.db.collection('users').findOne({ 'email': req.body.email })
        .then(doc => {
            if (doc) {
                const data = {};
                data.email = doc.email;
                data.password = doc.password;
                const token = jwtManager.generate(data);
                res.json({ data: token, status: 'success' });
            } else {
                res.json({ status: 'invalid_user' });
            }
        });
});

module.exports = router;
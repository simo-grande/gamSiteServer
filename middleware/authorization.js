const jwtManager = require("../jwt/jwtManager");

class Authorization {
    authentication(req, res, next) {

        if (req.url === "/auth") {
            next();
            return;
        }
        const header = req.headers.authorization;
        if (!header) {
            return res.json({ status: "auth_error" });
        } else {
            const data = jwtManager.verify(header);
            if (!data) {
                return res.json({ status: "auth_error" });
            }
            next();
        }
    }
}
module.exports = new Authorization();
const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get(
        "/api/admin/users",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.getListUser
    );

    app.put(
        "/api/admin/users",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.updateStatus
    );
};

const { authJwt } = require("../middlewares");
const postLikeController = require("../controllers/post-like.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept",
            "Access-Control-Allow-Methods",
        );
        next();
    });

    app.post("/api/post-like", [authJwt.verifyToken], postLikeController.save);

    app.delete("/api/post-like", [authJwt.verifyToken], postLikeController.delete);
};

const { authJwt } = require("../middlewares");
const postController = require("../controllers/post.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/posts", postController.findAllPost);

    app.post("/api/posts", [authJwt.verifyToken], postController.save);

    app.delete("/api/posts", [authJwt.verifyToken, authJwt.haveAdminRole], postController.delete);

    app.put("/api/posts", [authJwt.verifyToken, authJwt.haveAdminRole], postController.update);

    app.get("/api/posts/:postId", postController.getDetailPost);
};

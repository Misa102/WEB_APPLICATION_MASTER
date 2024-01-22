const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");


//add discord authentication route 
const controller = require("../controllers/auth.controller");



module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/auth/signup",
        [
            verifySignUp.checkDuplicateUsernameOrEmail,
            verifySignUp.checkRolesExisted,
        ],
        controller.signup
    );

    app.post("/api/auth/login", controller.login);


    app.get("/api/auth/discord-login", controller.discordLogin);

    app.get("/api/auth/discord-callback", controller.discordCallback);

    app.get("/api/auth/check-token", controller.verifyToken);
};

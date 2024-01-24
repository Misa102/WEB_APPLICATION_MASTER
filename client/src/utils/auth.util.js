const { isNotNullAndNotUndefined } = require("./validation.util");

function isLogin() {
    return (
        localStorage.getItem("token") !== null &&
        localStorage.getItem("token") !== undefined
    );
}

function isAdmin() {
    let user = JSON.parse(localStorage.getItem("user"));
    if (isNotNullAndNotUndefined(user)) {
        return (
            Array.from(user.roles).filter((v) => v === "ROLE_ADMIN").length > 0
        );
    }
    return false;
}

function getUser() {
    return JSON.parse(localStorage.getItem("user"));
}

function authHeader() {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.accessToken) {
        return { "x-access-token": user.accessToken };
    } else {
        return {};
    }
}

const authUtils = {
    isLogin,
    authHeader,
    getUser,
    isAdmin,
};

module.exports = authUtils;

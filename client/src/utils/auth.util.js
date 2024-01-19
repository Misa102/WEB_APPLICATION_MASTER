function isLogin() {
    return (
        localStorage.getItem("token") !== null &&
        localStorage.getItem("token") !== undefined
    );
}

function authHeader() {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.accessToken) {
        return { "x-access-token": user.accessToken };
    } else {
        return {};
    }
}

module.exports = { isLogin, authHeader };

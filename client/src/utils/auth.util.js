
function isLogin() {
    return (localStorage.getItem("token") !== null) && (localStorage.getItem("token") !== undefined);
}

module.exports = isLogin;
import { useParams } from "react-router";

export default function DiscordCallback() {
    const params = new URLSearchParams(document.location.search);
    let id = params.get("id");
    let username = params.get("username");
    let email = params.get("email");
    let roles = params.get("roles");
    let accessToken = params.get("accessToken");
    localStorage.setItem("user", JSON.stringify({
        id: id,
        username: username,
        email: email,
        roles: [roles],
        accessToken: accessToken
    }));
    localStorage.setItem("token", accessToken);
    window.location.href = "/";
}
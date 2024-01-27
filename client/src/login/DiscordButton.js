import React, { useEffect, useState } from "react";
import { URL } from "../config/discord.config";

const DiscordButton = () => {
    const onDiscordLogin = async () => {
        try {
            window.location.href = URL;
        } catch (error) {
            console.error("Error connecting with Discord:", error.message);
        }
    };

    return (
        <button onClick={onDiscordLogin} className="btn btn-secondary btn-lg">
            Connexion avec Discord
        </button>
    );
};

export default DiscordButton;

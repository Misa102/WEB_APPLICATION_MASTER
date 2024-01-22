import React, { useEffect, useState } from 'react';

const DiscordButton = () => {
    const [discordConfig, setDiscordConfig] = useState({});

    useEffect(() => {
        // Fetch Discord configuration from the server
        fetch('/api/auth/discord-config')
            .then(response => response.json())
            .then(data => setDiscordConfig(data))
            .catch(error => console.error('Error fetching Discord config:', error));
    }, []);

    const discordAuthUrl = `https://discord.com/login?client_id=${discordConfig.DISCORD_CLIENT_ID}&redirect_uri=${discordConfig.DISCORD_REDIRECT_URI}&response_type=code&scope=identify`;

    const handleDiscordLogin = async () => {
        try {
            console.log("Redirecting to Discord authorization...");
            // Redirection côté client vers l'URL d'autorisation Discord
            window.location.href = discordAuthUrl;
        } catch (error) {
            console.error('Error connecting with Discord:', error.message);
        }
    };

    return (
        <button onClick={handleDiscordLogin} className="btn btn-secondary btn-lg">
            Connect with Discord
        </button>
    );
};

export default DiscordButton;

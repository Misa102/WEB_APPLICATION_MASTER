const Discord = require("discord.js");
const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.MessageContent,
    ],
});
const { BOT_TOKEN } = require("../config/discord.config");

const db = require("../models");
const ObjectId = require("mongodb").ObjectId;

const Post = db.post;
const User = db.user;
const PostLike = db.postLike;

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.login(BOT_TOKEN);

client.on("messageCreate", (msg) => {
    let content = msg.content;
    let username = msg.author.username;
    if (content.substring(0, 7) === "/cquote") {
        let quoteContent = content.split("-content")[1];
        if (quoteContent.trim().length > 0) {
            User.findOne({ usernameDiscord: username })
                .then((user) => {
                    if (user) {
                        const post = new Post({
                            content: quoteContent.trim(),
                            createBy:
                                user.username === ""
                                    ? user.usernameDiscord
                                    : user.username,
                            modifiedBy:
                                user.username === ""
                                    ? user.usernameDiscord
                                    : user.username,
                            user: user,
                        });
                        post.save()
                            .then((post) => {
                                msg.reply("Quote created!");
                                msg.reply("Content: " + post.content);
                                msg.reply(
                                    `Url: http://localhost:3000/quotes/${post.id}`
                                );
                            })
                            .catch((err) => {
                                msg.reply(`Error: ${err}`);
                            });
                    } else {
                        msg.reply("User is not registered");
                        msg.reply(
                            "Please visit this link to connect http://localhost:3000/auth/login"
                        );
                    }
                })
                .catch((err) => {
                    msg.reply(`Error: ${err}`);
                });
        } else {
            msg.reply("Content cannot be empty");
        }
    }

    if (content.substring(0, 7) === "/lquote") {
        User.findOne({ usernameDiscord: username })
            .then((user) => {
                if (user) {
                    Post.find({ user: user })
                        .then((post) => {
                            if (post) {
                                const embedPost = new Discord.EmbedBuilder()
                                .setColor(0x0099FF)
                                .addFields(post.map(p => (
                                    {name: `Id: ${p.id}`, value: `Content: ${p.content}`}
                                )))
                                         
                                msg.reply({embeds: [embedPost]})
                            } else {
                                msg.reply("No quotes found");
                                msg.reply(
                                    "Use the command line '/quote --content' to create your first quote"
                                );
                            }
                        })
                        .catch((err) => {
                            msg.reply(`Error: ${err}`);
                        });
                } else {
                    msg.reply("User is not registered");
                    msg.reply(
                        "Please visit this link to connect http://localhost:3000/auth/login"
                    );
                }
            })
            .catch((err) => {
                msg.reply(`Error: ${err}`);
            });
    }
});

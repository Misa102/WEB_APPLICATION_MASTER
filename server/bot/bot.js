const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:webm1@cluster0.7mbewn7.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});
const mongoose = require('mongoose');

const citationSchema = new mongoose.Schema({
  content: String,
  author: String,
  date: String,
});

const Citation = mongoose.model('Citation', citationSchema);

module.exports = Citation;
const Citation = require('./citationModel'); 



// Arrays to store citations and favorites

client.on('ready', () => {
    console.log(`${client.user.tag} has logged in!`);

    // Set the bot's activity
    client.user.setActivity('Managing Citations', { type: 'WATCHING' });
});
client.on('messageCreate', (message) => {
    console.log('Message received:', message.content);

    if (message.author.bot) return; // Ignore messages from other bots

    //the message content
    const args = message.content.split(' ');
    const command = args[0].toLowerCase();
    console.log('Command:', command);
    console.log('Args:', args.slice(1));

    if (message.content.toLowerCase() === 'ping') {
        message.reply('Pong!');
    }

    if (message.content.toLowerCase() === 'quoi?') {
        message.reply('quoicoubah!');
    }

    if (command === '/trd-add-citation') {
        // Command to add a new citation
        const content = args.slice(1).join(' ');
        if (content) {
            const newCitation = {
                content: content,
                author: message.author.username,
                date: new Date().toLocaleDateString(),
            };
            citations.push(newCitation);
            message.reply('Added a new citation!').then(() => {
                console.log('Reply sent successfully');
            })
                .catch((error) => {
                    console.error('Error sending reply:', error);
                });
        } else {
            message.reply('Please provide the content for the citation.')
                .then(() => {
                    console.log('Reply sent successfully');
                })
                .catch((error) => {
                    console.error('Error sending reply:', error);
                });
        }
    } else if (command === '/trd-list-citations') {
        // Command to list all citations
        if (citations.length > 0) {
            const citationList = citations.map((citation) => `- ${citation.content} (By: ${citation.author}, Date: ${citation.date})`);
            message.reply(`List of Citations:\n${citationList.join('\n')}`).then(() => {
                console.log('Reply sent successfully');
            })
                .catch((error) => {
                    console.error('Error sending reply:', error);
                });
        } else {
            message.reply('No citations available.').then(() => {
                console.log('Reply sent successfully');
            })
                .catch((error) => {
                    console.error('Error sending reply:', error);
                });
        }
    } else if (command === '/trd-list-favorites') {
        // Command to list favorite citations
        if (favorites.length > 0) {
            const favoriteList = favorites.map((favorite) => `- ${favorite.content} (By: ${favorite.author}, Date: ${favorite.date})`);
            message.reply(`List of Favorite Citations:\n${favoriteList.join('\n')}`).then(() => {
                console.log('Reply sent successfully');
            })
                .catch((error) => {
                    console.error('Error sending reply:', error);
                });
        } else {
            message.reply('No favorite citations available.') .then(() => {
                console.log('Reply sent successfully');
            })
                .catch((error) => {
                    console.error('Error sending reply:', error);
                });
        }
    }
});




client.login('MTE3NDAwODc3Mzk3OTkzMDYyNQ.GOSLDB.HKx-_nD89A2jjYBiAjZo_uqKE8cFBuPEMaAlvM').then(() => {
    console.log(`${client.user.tag} has logged in!`);
})
    .catch((error) => {
        console.error('Error logging in:', error);
    });
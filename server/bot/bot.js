
const { Client, Intents } = require('discord.js');
const mongoose = require('mongoose');
const Citation = require('./citationModel');

// Create a new Discord client
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

// Connect to MongoDB
mongoose.connect('mongodb+srv://admin:webm1@cluster0.7mbewn7.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Event when the bot is ready
client.on('ready', () => {
  console.log(`${client.user.tag} has logged in!`);
  client.user.setActivity('Managing Citations', { type: 'WATCHING' });
});

// Event when a message is received
client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  const args = message.content.split(' ');
  const command = args[0].toLowerCase();

  if (command === '/trd-add-citation') {
        const content = args.slice(1).join(' ');
    
        if (content) {
            const newCitation = new Citation({
                content: content,
                author: message.author.username,
                date: new Date().toLocaleDateString(),
            });
    
            newCitation.save((err) => {
                if (err) {
                    console.error('Error saving citation:', err);
                    message.reply('Error adding citation.');
                } else {
                    message.reply('Added a new citation!');
                }
            });
        } else {
            message.reply('Please provide the content for the citation.');
        }
    
    
    } else if (command === '/trd-list-citations') {
        try {
          const citations = await Citation.find();
          if (citations.length > 0) {
            const citationList = citations.map((citation) => `- ${citation.content} (By: ${citation.author}, Date: ${citation.date})`);
            message.reply(`List of Citations:\n${citationList.join('\n')}`);
          } else {
            message.reply('No citations available.');
          }
        } catch (error) {
          console.error('Error fetching citations:', error);
          message.reply('Error fetching citations.');
        }
      } else if (command === '/trd-list-favorites') {
        try {
          
          const favorites = await Citation.find({  });
          if (favorites.length > 0) {
            const favoriteList = favorites.map((favorite) => `- ${favorite.content} (By: ${favorite.author}, Date: ${favorite.date})`);
            message.reply(`List of Favorite Citations:\n${favoriteList.join('\n')}`);
          } else {
            message.reply('No favorite citations available.');
          }
        } catch (error) {
          console.error('Error fetching favorite citations:', error);
          message.reply('Error fetching favorite citations.');
        }
      }
    });




client.login('MTE3NDAwODc3Mzk3OTkzMDYyNQ.GOSLDB.HKx-_nD89A2jjYBiAjZo_uqKE8cFBuPEMaAlvM').then(() => {
    console.log(`${client.user.tag} has logged in!`);
})
    .catch((error) => {
        console.error('Error logging in:', error);
    });
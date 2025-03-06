/*
███╗   ███╗ █████╗ ██████╗ ███████╗    ██████╗ ██╗   ██╗    ██╗██████╗ ███████╗ ██████╗ 
████╗ ████║██╔══██╗██╔══██╗██╔════╝    ██╔══██╗╚██╗ ██╔╝    ██║██╔══██╗██╔════╝██╔════╝ 
██╔████╔██║███████║██║  ██║█████╗      ██████╔╝ ╚████╔╝     ██║██║  ██║███████╗██║  ███╗
██║╚██╔╝██║██╔══██║██║  ██║██╔══╝      ██╔══██╗  ╚██╔╝      ██║██║  ██║╚════██║██║   ██║
██║ ╚═╝ ██║██║  ██║██████╔╝███████╗    ██████╔╝   ██║       ██║██████╔╝███████║╚██████╔╝
╚═╝     ╚═╝╚═╝  ╚═╝╚═════╝ ╚══════╝    ╚═════╝    ╚═╝       ╚═╝╚═════╝ ╚══════╝ ╚═════╝ 
*/
const { GenerateImage } = require('@flareai/api');
const { Client, GatewayIntentBits, Events } = require('discord.js');
// All right's reserved to id5g , https://dark-dev.netlify.app/
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages
    ]
});
// All right's reserved to id5g , https://dark-dev.netlify.app/
client.once(Events.ClientReady, async () => {
    console.log(`Logged In As ${client.user.tag}`)
});
// All right's reserved to id5g , https://dark-dev.netlify.app/
const channel = "CHANNEL_ID";
// All right's reserved to id5g , https://dark-dev.netlify.app/
client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot) return;
  if (message.channel.id == channel) {
    const prompt = message.content;
    const reply = await message.reply(`**Gnereating Image ...**`)
    GenerateImage(prompt)
      .then(imageUrl => reply.edit(imageUrl))
      .catch(error => console.error(error))
  }
});
// All right's reserved to id5g , https://dark-dev.netlify.app/
client.login('BOT_TOKEN');

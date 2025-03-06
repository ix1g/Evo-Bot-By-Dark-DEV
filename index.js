/*
███╗   ███╗ █████╗ ██████╗ ███████╗    ██████╗ ██╗   ██╗    ██╗██████╗ ███████╗ ██████╗ 
████╗ ████║██╔══██╗██╔══██╗██╔════╝    ██╔══██╗╚██╗ ██╔╝    ██║██╔══██╗██╔════╝██╔════╝ 
██╔████╔██║███████║██║  ██║█████╗      ██████╔╝ ╚████╔╝     ██║██║  ██║███████╗██║  ███╗
██║╚██╔╝██║██╔══██║██║  ██║██╔══╝      ██╔══██╗  ╚██╔╝      ██║██║  ██║╚════██║██║   ██║
██║ ╚═╝ ██║██║  ██║██████╔╝███████╗    ██████╔╝   ██║       ██║██████╔╝███████║╚██████╔╝
╚═╝     ╚═╝╚═╝  ╚═╝╚═════╝ ╚══════╝    ╚═════╝    ╚═╝       ╚═╝╚═════╝ ╚══════╝ ╚═════╝ 
*/
const { GenerateImage } = require('@flareai/api'); // Flare/API NPM
const { Client, GatewayIntentBits, Events } = require('discord.js');
const fs = require('fs');
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
const channel = "CHANNEL_ID"; // The image generation channel when you send message for example "A logo for Dark Host" it will response

// Load NSFW words from nsfwWords.json
const nsfwWords = JSON.parse(fs.readFileSync('nsfwWords.json', 'utf-8'));

// Cooldown system
const cooldowns = new Set();

// All right's reserved to id5g , https://dark-dev.netlify.app/
client.on(Events.MessageCreate, async (message) => {
    if (message.author.bot) return;
    if (message.channel.id == channel) {
        const prompt = message.content.toLowerCase();
        // Check the prompt if it has NSFW word if it has it will be blocked, it will be include nsfwWords.json
        if (nsfwWords.some(word => prompt.includes(word))) {
            return message.reply("❌ **Your request contains `NSFW` content and has been blocked**");
        }
        // Cooldown check
        if (cooldowns.has(message.author.id)) {
            return message.reply("⏳ **Please wait 5s before generating another img**");
        }
        cooldowns.add(message.author.id);
        setTimeout(() => cooldowns.delete(message.author.id), 5000); // 5 seconds cooldown

        const reply = await message.reply(`**Generating Image ...**`);
        GenerateImage(prompt)
            .then(imageUrl => reply.edit(imageUrl))
            .catch(error => console.error(error));
    }
});
// All right's reserved to id5g , https://dark-dev.netlify.app/
client.login('BOT_TOKEN');

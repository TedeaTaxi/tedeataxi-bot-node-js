const Discord = require("discord.js")


const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })


client.on("ready", () => {
console.log(`Logged in as ${client.user.tag}!`)
})




client.login('OTA0MDEyNzQ4NTk2MzM0NjUz.YX1Vew.cYKVO1btpi7xLngvda87yzoltaw');
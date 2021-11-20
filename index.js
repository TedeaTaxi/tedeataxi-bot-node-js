const discord = require("discord.js");
const { Client, Intents } = require('discord.js');



const client = new discord.Client({
  intents: [
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_INVITES,
    Intents.FLAGS.GUILD_INTEGRATIONS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_TYPING,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_WEBHOOKS,
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS
  ],
});
client.commands = new discord.Collection();
client.aliases = new discord.Collection();

client.on("ready", () => {
console.log(`Logged in as ${client.user.tag}!`)
})


// plaats alle modules hier in de lijst
const fs = require("fs"),
  { join } = require("path"),
  moment = require('moment'),
  functions = require('./functions.js'),
  botConfig = require("./botconfig.json")

//define alle modules hier
client.modules = { fs, join, moment, discord, functions ,botConfig}

//set module moment to eng location
moment.locale('en')


//Comand Loader
fs.readdir("./commands/", (err, files) => {
  if (err) console.log(err);
  var jsFiles = files.filter(f => f.split(".").pop() === "js");
  if (jsFiles.length <= 0) {
    console.log("Kon geen bestanden vinden! (commands)")
  }
  jsFiles.forEach(async (f, i) => {
    var fileGet = require(`./commands/${f}`);
    console.log(`Het bestand ${f} is ingeladen!`);
    client.commands.set(fileGet.help.name, fileGet);
    if (fileGet.help.aliases) {
      await fileGet.help.aliases.map(alias => {
        client.aliases.set(alias, fileGet);
      })
    }
  })
});



//Event Loader
fs.readdir("./events/", (err, files) => {
  if (err) console.log(err);
  var jsFiles = files.filter(f => f.split(".").pop() === "js");
  if (jsFiles.length > 0) {
    jsFiles.map(async eventF => {
      const event = require(`./events/${eventF}`)
      const eventName = eventF.split(".").shift();
      client.on(eventName, event.bind(null, client))
    })
  }
});

client.login(botConfig.token);

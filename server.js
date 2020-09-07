const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const express = require("express");
const fs = require("fs");
let cooldown = new Set();
let cdseconds = 3;
var jimp = require("jimp");
const db = require("quick.db");
const bot = new Discord.Client({ disableEveryone: true });

//command loaded
bot.commands = new Discord.Collection();

fs.readdir("./commands", (err, files) => {
    if(err) console.error(err);

    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if(jsfiles.length <= 0) {
        console.log("No commands found to load!");
        return;
    }

    console.log(`Loading ${jsfiles.length} commands!`);

    jsfiles.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`${i + 1}: ${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });
});

//motherfucker don't touch this again
bot.on("ready", async () => {
  let memember = bot.guilds.get("661777660229189663").memberCount
  console.log("wow");
  bot.user.setActivity(`${memember} Members | j!help`, { type: "WATCHING"});
});


  


bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;  

    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);
    
    //prefix reader
  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
  if (!prefixes[message.guild.id]) {
    prefixes[message.guild.id] = {
      prefixes: botconfig.prefix
    };
  }
  
  let prefix = prefixes[message.guild.id].prefixes;
  

    if(!command.startsWith(prefix)) return;

    let cmd = bot.commands.get(command.slice(prefix.length));
    if(cmd) cmd.run(bot, message, args);
  
try {
  cmd.run(bot, message, args)
} catch (err) {
} finally {
  console.log(`${message.author.tag} menggunakan command ${prefix}${command}`)
}
  
  setTimeout(() => {
    cooldown.delete(message.author.id);
  }, cdseconds * 1000);

const prefixMention = new RegExp(`^<@!?${bot.user.id}>`);
  
  const embed = new Discord.RichEmbed()
    .setColor("PURPLE")
    .setDescription(`**Hai, prefix ku \`${prefix}\`**`)
  if(message.content.match(prefixMention)) 
  return message.channel.send(embed)

  //command prefix listener
  if (!message.content.startsWith(prefix)) return;

  if (cooldown.has(message.author.id)) {
    message.delete();
    return message.reply("You have to wait 3 seconds between commands.");
  }
  if (!message.member.hasPermission("ADMINISTRATOR")) {
    cooldown.add(message.author.id);
  }
});
//message log
bot.on("messageDelete", async (message) => {
  const entry = await message.guild.fetchAuditLogs({type: 'MESSAGE_DELETE'}).then(audit => audit.entries.first())
  let user = ""
    if (entry.extra.channel.id === message.channel.id
      && (entry.target.id === message.author.id)
      && (entry.createdTimestamp > (Date.now() - 5000))
      && (entry.extra.count >= 1)) {
    user = entry.executor.username
  } else { 
    user = message.author
  }
  const deleted = new Discord.RichEmbed()
    .setColor('#0099ff')
    .setAuthor(message.author.tag, message.author.avatarURL)
    .setDescription(`**Message Send by ${user} in Channel ${message.channel} Has been Deleted**\n❱ ${message.content}`)
    .setTimestamp()
    .setFooter("log", message.guild.iconURL);
  let logchan = message.guild.channels.find( channel => channel.name ==="log");
  if (!logchan) return; 
  logchan.send(deleted);
});

//members count
bot.on("guildMemberAdd", member => {
  let universCafe = bot.guilds.get("661777660229189663");
  let memberCount = universCafe.memberCount;
  let memberCountChannel = universCafe.channels.get("432533456807919639");
  memberCountChannel
    .setName(`Users count : `  + memberCount)
    .then(result => console.log(result))
    .catch(error => console.log(error));
});

bot.on("guildMemberRemove", member => {
  let universCafe = bot.guilds.get("661777660229189663");
  let memberCount = universCafe.memberCount;
  let memberCountChannel = universCafe.channels.get("432533456807919639");
  memberCountChannel
    .setName(`Users count : ` + memberCount)
    .then(result => console.log(result))
    .catch(error => console.log(error));
});



bot.login(process.env.TOKEN);
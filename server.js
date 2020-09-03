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

fs.readdir("./commands/", (err, files) => {
  if (err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if (jsfile.length <= 0) {
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });
});

//thing u should don't touched
bot.on("ready", async () => {
  console.log("wow");
  bot.user.setActivity("u!help | u!report @user", { type: "WATCHING"});
});


bot.on("message", async message => {
  if (message.author.bot) return;
  if (message.channel.type == "dm") return;

  //prefix reader
  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
  if (!prefixes[message.guild.id]) {
    prefixes[message.guild.id] = {
      prefixes: botconfig.prefix
    };
  }


  //command prefix listener
  let prefix = prefixes[message.guild.id].prefixes;
  if (!message.content.startsWith(prefix)) return;

  if (cooldown.has(message.author.id)) {
    message.delete();
    return message.reply("You have to wait 3 seconds between commands.");
  }
  if (!message.member.hasPermission("ADMINISTRATOR")) {
    cooldown.add(message.author.id);
  }

  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if (commandfile) commandfile.run(bot, message, args);

  setTimeout(() => {
    cooldown.delete(message.author.id);
  }, cdseconds * 1000);
});

//logging stuff *not completed yeet
bot.on("messageDelete", message => {
  const deleted = new Discord.RichEmbed()
    .setTitle("message deleted")
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField("message", message.content)
    .addField("channel", message.channel)
    .setTimestamp()
    .setFooter("log", message.guild.iconURL);

  let logchan = message.guild.channels.find(channel => channel.name === "log");
  if (!logchan) return;
  logchan.send(deleted);
});

//members count
bot.on("guildMemberAdd", member => {
  let universCafe = bot.guilds.get("661777660229189663");
  let memberCount = universCafe.memberCount;
  let memberCountChannel = universCafe.channels.get("679430564578590720");
  memberCountChannel
    .setName(`Members : ` + memberCount)
    .then(result => console.log(result))
    .catch(error => console.log(error));
});

bot.on("guildMemberRemove", member => {
  let universCafe = bot.guilds.get("677165505999667269");
  let memberCount = universCafe.memberCount;
  let memberCountChannel = universCafe.channels.get("679430564578590720");
  memberCountChannel
    .setName(`Members : ` + memberCount)
    .then(result => console.log(result))
    .catch(error => console.log(error));
});


//welcomer need few corrections
bot.on("guildMemberAdd", async member => {
  let wChan = db.fetch(`${member.guild.id}`);

  if (wChan == "678919804886712331") return;

  if (!wChan) return;

  let font = await jimp.loadFont(jimp.FONT_SANS_32_BLACK); 
  let font64 = await jimp.loadFont(jimp.FONT_SANS_64_WHITE); 
  let bfont64 = await jimp.loadFont(jimp.FONT_SANS_64_BLACK);
  let mask = await jimp.read("https://i.imgur.com/552kzaW.png");
  let welcome = await jimp.read(
    "http://rovettidesign.com/wp-content/uploads/2011/07/clouds2.jpg"
  ); 

  jimp.read(member.user.displayAvatarURL).then(avatar => {
    avatar.resize(200, 200);
    mask.resize(200, 200);
    avatar.mask(mask);
    welcome.resize(1000, 300);

    welcome.print(font64, 265, 55, `Welcome ${member.user.username}`); 
    welcome.print(bfont64, 265, 125, `To ${member.guild.name}`);
    welcome.print(
      font64,
      265,
      195,
      `There are now ${member.guild.memberCount} users`
    );
    welcome.composite(avatar, 40, 55).write("Welcome2.png"); 
    try {
      member.guild.channels.id("678919804886712331").send(`welcome <@${member.author.id}>`, { files: ["Welcome2.png"] });
    } catch (e) {
    }
  });
});

bot.login(process.env.TOKEN);
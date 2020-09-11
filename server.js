const Discord = require('discord.js');
const botSettings = require("./botsettings.json");
const fs = require("fs");
const request = require("request");
const client = new Discord.Client();
const prefix = botSettings.prefix;

const bot = new Discord.Client({ disableEveryone: true });
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

fs.readdir("./commands", (err, files) => {
  if (err) console.error(err);

  let jsfiles = files.filter(f => f.split(".").pop() === "js");
  if (jsfiles.length <= 0) {
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
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~START CONSOLE~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\\
bot.on("ready", async message => {
  console.log(
    `Bots is ready and working in ${bot.guilds.cache.size} servers with ${bot.users.cache.size} users!`
  );

  bot.user.setStatus("Online");
  bot.user.setActivity(`with ${bot.users.cache.size} Members | j!help`);

  try {
    let link = await bot.generateInvite(["ADMINISTRATOR"]);
    console.log(link);
  } catch (e) {
    console.log(e.stack);
  }
});
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~START COMMANDS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\\
bot.on("message", async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;

  let messageArray = message.content.split(" ");
  let command = messageArray[0];
  let args = messageArray.slice(1);

  const prefixMention = new RegExp(`^<@!?${bot.user.id}>`);

  const embed = new Discord.MessageEmbed()
    .setColor("PURPLE")
    .setDescription(`**Hai, prefix ku \`${prefix}\`**`);
  if (message.content.match(prefixMention)) return message.channel.send(embed);

  if (!command.startsWith(prefix)) return;

  let cmd = bot.commands.get(command.slice(prefix.length));
  if (cmd)
    try {
      cmd.run(bot, message, args);
    } catch (err) {
    } finally {
      console.log(`${message.author.tag} menggunakan command ${command}`);
    }
});
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~LOGS COMMANDS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\\
//MESSAGE DELETE
bot.on("messageDelete", async message => {
  const CHANNEL = "⌘・bots◟log";
  if (message.channel.type == "text") {
    var logger = message.guild.channels.cache.find(
      channel => channel.name === CHANNEL
    );
    if (logger) {
      const embed = new Discord.MessageEmbed()
        .setColor("#0099ff")
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setDescription(
          `**Message Send by ${message.author} in Channel ${message.channel} Has been Deleted**\n❱ ${message.content}`
        )
        .setTimestamp()
        .setFooter("log", message.guild.iconURL);
      logger.send({ embed });
    }
  }
});

//WELCOMER & GOODBYE
bot.on("guildMemberAdd", member => {
  let universCafe = bot.guilds.cache.get("661777660229189663");
  let memberCount = universCafe.memberCount;
  let memberCountChannel = universCafe.channels.cache.get("752409981730422915");
  memberCountChannel
    .setName(`Users count : ` + memberCount)
    .then(result => console.log(result))
    .catch(error => console.log(error));
});

bot.on("guildMemberRemove", member => {
  let universCafe = bot.guilds.cache.get("661777660229189663");
  let memberCount = universCafe.memberCount;
  let memberCountChannel = universCafe.channels.cache.get("752409981730422915");
  memberCountChannel
    .setName(`Users count : ` + memberCount)
    .then(result => console.log(result))
    .catch(error => console.log(error));
});

bot.on("message", async message => {
  if (message.content.startsWith("raven ganteng"))
    return message.channel.send({
      files: [
        "https://cdn.discordapp.com/attachments/454699750336364554/753616779569528842/images_-_2020-09-10T220339.844.jpeg"
      ]
    });
  if (message.content.startsWith(`<@474963600428105749>`))
    return message.channel.send(" Apa Sayang? ");
});
bot.login(process.env.TOKEN);

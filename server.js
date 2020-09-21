const Discord = require('discord.js');
const botSettings = require("./botsettings.json");
const fs = require("fs");
const request = require("request");
const client = new Discord.Client({disableEveryone : true});
const prefix = botSettings.prefix;
const db = require("quick.db")

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
let chx = db.get(`welchannel_${member.guild.id}`); //defining var
  
  if(chx === null) { //check if var have value or not
    return;
  }

  let wembed = new Discord.MessageEmbed() //define embed
  .setColor("#0099ff")
  .setAuthor(`Selamat Datang di ${member.guild.name}`, member.guild.iconURL({  dynamic: true  }))
  .setThumbnail(member.user.avatarURL({  dynamic: true, size: 512}  ))
  .setImage("https://cdn.discordapp.com/attachments/468791184236740621/756570948047601934/tenor.gif")
  .setDescription(`**Hai** <@${member.id}> **Selamat datang di server \n${member.guild.name}.\n\nSebelum itu, silahkan lihat dulu channel** \n<#662721859481108490> <#744568027189608568> <#741726803613188106> \n<#662722010450755604> <#752149490642976838>\n **Jika bingung bisa tag** <@&662740013582254121> **\natau member yang sedang online.\n __Salam Japanisme__**`)
  .setTimestamp()
  
  const channel = member.guild.channels.cache.get(chx)
  channel.send(wembed)
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
    return message.channel.send("betul",{
      files: [
        "https://cdn.discordapp.com/attachments/454699750336364554/753616779569528842/images_-_2020-09-10T220339.844.jpeg"
      ]
    });
  if(message.content.startsWith('+ann')) {
    let channel = message.mentions.channels.first();
    let array = channel.slice(1).join(' ')

    channel.send(array);
}
    
});
// bot.on("message", message => {
//   if (message.content.startsWith('j!announce')) {
//     let rest_of_the_string = message.content.slice('j!announce'.length); //removes the first part
//     let array_of_arguments = rest_of_the_string.split(',.'); //[title, description, link, image]

//     let embed = new Discord.MessageEmbed()
//       .setTitle(array_of_arguments[0])
//       .setDescription(array_of_arguments[1])
//       .setImage(array_of_arguments[2] || null)
//       .setThumbnail(message.guild.iconURL({  dynamic: true  }))
//       .setColor(0x0099ff)
//       .setFooter("Japanisme Announcement")
//       .setTimestamp();

//     message.channel.send({ embed });
//   }
// });
bot.login(process.env.TOKEN).catch(console.error);

const Discord = require("discord.js");
const botSettings = require("./botsettings.json");
const fs = require("fs");
const request = require("request");
const client = new Discord.Client({
  disableMentions: "everyone",
  messageCacheMaxSize: Infinity,
  messageCacheLifetime: 540,
  messageSweepInterval: 180,
  ws: {
    intents: [
      "GUILDS",
      "GUILD_MEMBERS",
      "GUILD_BANS",
      "GUILD_EMOJIS",
      "GUILD_INVITES",
      "GUILD_VOICE_STATES",
      "GUILD_PRESENCES",
      "GUILD_MESSAGES",
      "GUILD_MESSAGE_REACTIONS",
      "GUILD_MESSAGE_TYPING",
      "DIRECT_MESSAGES",
      "DIRECT_MESSAGE_REACTIONS",
      "DIRECT_MESSAGE_TYPING"
    ]
  }
});
const prefix = botSettings.prefix;
const db = require("quick.db");

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
  bot.user.setActivity(`a!report`);

  try {
    let link = await bot.generateInvite(["ADMINISTRATOR"]);
    console.log(link);
  } catch (e) {
    console.log(e.stack);
  }
});
bot.login(process.env.TOKEN).catch(console.error);
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~START COMMANDS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\\
bot.on("message", async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;

  let messageArray = message.content.split(" ");
  let command = messageArray[0];
  let args = messageArray.slice(1);

  const prefixMention = new RegExp(`^<@!?${bot.user.id}>`);

  const embed = new Discord.MessageEmbed()
    .setColor("PINK")
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
//ROle Update
// bot.on("guildMemberUpdate", (oldMember, newMember) => {
//     if (oldMember.guilds.cache.get =!'661777660229189663') return;
//     if (oldMember.roles.cache.size == newMember.roles.cache.size) return;
//     let message;
//     let logchannel = message.guild.channels.cache.find(channel => channel.id === "743754814403379272")
//     let embed = new Discord.MessageEmbed()
//                 .setFooter("kontol")
//                 .setTimestamp();

//     if (oldMember.roles.cache.size > newMember.roles.cache.size) {
//         oldMember.roles.forEach(role => {
//             if (!newMember.roles.cache.get(role.id)) {
//                                 embed.setDescription("`" + role.name + "` was removed from " + newMember.user.username);
//                                 embed.setColor(role.hexColor)
//             }
//         });
//         logchannel.send({embed: embed})
//     }
//     else {
//         newMember.roles.forEach(role => {
//             if (!oldMember.roles.cache.get(role.id)) {
//                 embed.setDescription("`" + role.name + "` was added to " + newMember.user.username);
//                                 embed.setColor(role.hexColor)
//             }
//         });
//         logchannel.send({embed: embed})
//     }
// });

//MESSAGE DELETE
bot.on("messageDelete", async message => {
  const CHANNEL = "📌・delete-log";
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

bot.on("messageUpdate", (oldMessage, newMessage) => {
  if (oldMessage.author.bot) return;
  if (oldMessage.content == newMessage.content) return;
  let logchannel = oldMessage.guild.channels.cache.find(
    c => c.name === "📌・message-logs"
  );
  if (!logchannel) return;
  const embed = new Discord.MessageEmbed()
    .setAuthor(oldMessage.author.tag, oldMessage.author.displayAvatarURL())
    .setFooter(
      `Author ID: ${oldMessage.author.id} | Message ID: ${oldMessage.id}`
    )
    .setTimestamp(new Date())
    .setColor("#00cb16")
    .setTitle("Message edited")
    .addField(
      "Channel",
      `${oldMessage.channel} | [Go to message](${oldMessage.url})`
    )
    .addField("Old Message", oldMessage.content.substring(0, 1024))
    .addField("New Message", newMessage.content.substring(0, 1024));
  logchannel.send(embed);
});

//WELCOMER & GOODBYE
//bot.on("guildMemberAdd", async member => {
 // let chx = db.get(`welchannel_${member.guild.id}`); //defining var

 // if (chx === null) {
    //check if var have value or not
 //   return;
 // }

 // let embed = new Discord.MessageEmbed()
//    .setColor(0x0099ff)
//    .setAuthor(
//      `Japanisme Welcome Message`,
//      member.guild.iconURL({ dynamic: true })
//    )    .setTitle(`Selamat datang diserver ${member.guild.name}`)
//    .setDescription(
//      `**Hai <@${member.id}>\nSelamat datang diserver __[Japanisme](https://discord.gg/BxTcJSS)__. Sebelum itu, Silahkan lihat - lihat channel di kategori \n[──• DASBOARD •──]\n Jika butuh bantuan, silahkan mention staff yang sedang online. Terimakasih**`
//    )
//    .setThumbnail(member.user.avatarURL({ dynamic: true, size: 512 }))
//    .setImage(
//      "https://cdn.discordapp.com/attachments/468791184236740621/756570948047601934/tenor.gif"
//    )
//    .setFooter(
//      `Selamat Datang ${member.user.tag}, kamu member ke ${
//        member.guild.members.cache.filter(member => !member.user.bot).size
//      }`
//    );
//  const channel = member.guild.channels.cache.get(chx);
//  channel.send(embed);
//});

//bot.on("guildMemberAdd", async member => {
 // let memberCount = member.guild.members.cache.filter(
//    member => !member.user.bot
//  ).size;
//  let japscount = member.guild.channels.cache.get("752409981730422915");
//  await japscount.setName(`Users count : ` + memberCount);
//});

//bot.on("guildMemberRemove", async member => {/  let memberCount = member.guild.members.cache.filter(
 //   member => !member.user.bot
 // ).size;
  //let japscount = member.guild.channels.cache.get("752409981730422915");
 // await japscount.setName(`Users count : ` + memberCount);
//});
//-------------------------//dev only\\----------------------\\
bot.on("message", async message => {
  if (message.content.startsWith("raven ganteng"))
    return message.channel.send("betul", {
      files: [
        "https://cdn.discordapp.com/attachments/454699750336364554/753616779569528842/images_-_2020-09-10T220339.844.jpeg"
      ]
    });
  if (message.content.startsWith("+ann")) {
    let channel = message.mentions.channels.first();
    let args;
    let array = args.slice(1).join(" ");

    channel.send(array);
  }
});


// bot.on('message', async(message) => {
//   if(message.author.id === '673362753489993749') {
//     return message.channel.send('25 Detik lagi')
//     .then((msg)=> {setTimeout(function(){msg.edit('15 Detik lagi');}, 10000)})
//   }
// })

const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
  let helpIcon = bot.user.displayAvatarURL;
  let helpEmbed = new Discord.MessageEmbed()
    .setColor("#20C20E")
    .setTitle("❱ Japanisme Bot Commands", bot.user.displayAvatarURL())
    .setDescription(`hello this is a list of Japanisme bot commands \nif you have any suggestions, you can tag our developer ^^`)
    .addField("❱ General", "**``help  8ball  kiss  hug  userinfo  ping  coinflip  hello  avatar  say  serverinfo  report``**")
    .addField("❱ Moderator","**``tempmute  kick  clear  unban  ban  mute  addrole  delrole``**")
    .setThumbnail(bot.user.displayAvatarURL({ dynamic:true  }))
    .setTimestamp()
    .setFooter(`❱ ${message.guild.name}`, bot.user.displayAvatarURL())

  message.channel.send(helpEmbed);
let embed = new Discord.MessageEmbed()
.setAuthor('Japanisme Bot Commands')
.setDescription('Hai, Saya adalah Official Bot Japanisme. Semoga saya dapat membantu kalian semua. \nBerikut list Command yang saya miliki:')
.setColor('#0099ff')
.addField("Moderator Command", `**\`Kick\`  \`Ban\`  \`Mute\`  \`Tempmute\`  \`Clear\`  \`Unban\`  \`Addrole\`  \`Delrole\`**`)
.addField("General Command",`**\`Help\`  \`Ping\`   \`Userinfo\`  \`Avatar\`  \`Say\`  \`Serverinfo\`  \`Report\`**`)
.addField("Fun Command",`**\`8ball\`  \`Kiss\`  \`Hug\`  \`Coinflip\`  \`Hello\`**`)
.setThumbnail(bot.user.displayAvatarURL({})
.setTimestamp()
message.channel.send(embed)
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['h'],
    permLevel: 0
  };

module.exports.help = {
  name : "help"
}
const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

let embed = new Discord.MessageEmbed()
.setAuthor('Japanisme Bot Commands')
.setDescription('Hai, Saya adalah Official Bot Japanisme. Semoga saya dapat membantu kalian semua. Jika ada command yanh tidak merespon bisa hubungi staff yang online. \nBerikut list Command yang saya miliki:')
.setColor('#0099ff')
.addField("❱ Moderator Command", `**\`Kick\`  \`Ban\`  \`Mute\`  \`Tempmute\`  \`Clear\`  \`Unban\`  \`Addrole\`  \`Delrole\`**`)
.addField("❱ General Command",`**\`Help\`  \`Ping\`   \`Userinfo\`  \`Avatar\`  \`Say\`  \`Serverinfo\`  \`Report\`**`)
.addField("❱ Fun Command",`**\`8ball\`  \`Kiss\`  \`Hug\`  \`Coinflip\`  \`Hello\`**`)
.setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
.setTimestamp()
.setFooter(message.guild.name, bot.user.displayAvatarURL())
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
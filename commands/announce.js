const Discord = require('discord.js')
exports.run = async (message, client, args) => {
 // if (!message.member.hasPermission("ADMINISTRATOR")) return;
  let before = args.slice(1).join(' ')
  let after = before.split('/+')
  let embed = new Discord.MessageEmbed()
  .setAuthor('Japanese Announcement')
  .setColor('#FFFF00')
  .setDescription(after[0])
  .setImage(after[1] || null)
  let channel = message.mentions.channels.first()
  if(!channel) return message.reply('Mention Channel terlebih dahulu')
  channel.send(embed)
//     let data = args.join(' ')
//     let content = data.split(',.') //[title, description, link, image]
//     let announce = new Discord.MessageEmbed()
//     .setColor(0x00ff99)
//     .setAuthor(data)
//     .setTitle()
//     .setDescription()
//     .setTimestamp()
//     .setFooter('Announcement Japanisme')
// message.channel.send(data);
}
module.exports.help = {
  name: "announce"
}

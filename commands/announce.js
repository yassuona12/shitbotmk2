const Discord = require('discord.js')
exports.run = async (message, client, args) => {
    let data = args.join(' ')
    let content = data.split(',.') //[title, description, link, image]
    let announce = new Discord.MessageEmbed()
    .setColor(0x00ff99)
    .setAuthor(data)
    .setTitle()
    .setDescription()
    .setTimestamp()
    .setFooter('Announcement Japanisme')
message.channel.send(data);
}
module.exports.help = {
  name: "announce"
}

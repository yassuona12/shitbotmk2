const Discord = require('discord.js')
exports.run = async (message, client, args) => {
    let channel = message.mentions.channels.first()
    if(!channel) {
      return message.channel.send('Silahkan mention channel yang diinginkan')
    }
    let data = args.slice(1).join(' ')
    let content = data.split(',.'); //[title, description, link, image]
    let announce = new Discord.MessageEmbed()
    .setColor(0x00ff99)
    .setAuthor()
    .setTitle()
    .setDescription()
    .setTimestamp()
    .setFooter('Announcement Japanisme')
    channel.send(announce)
//     let embed = new Discord.MessageEmbed()
//       .setColor(0x00AE86)
//       .setTitle(array_of_arguments[0])
//       .setDescription(array_of_arguments[1])
//       .setImage(array_of_arguments[3])
//       .setURL(array_of_arguments[2])
//       .addField("Text", true)
//       .setThumbnail("https://i.imgur.com/Rmiwd1j.png")
//       .setFooter("Footer", array_of_arguments[3])
//       .setTimestamp();

//     message.channel.send(embed);
}
module.exports.help = {
  name: "announce"
}

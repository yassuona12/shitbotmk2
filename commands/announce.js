const Discord = require('discord.js')
exports.run = async (message, client, args) => {
    let data = args.join(' ')
    let content = data.split(',.'); //[title, description, link, image]
    let announce = new Discord.MessageEmbed()
    .setColor(0x00ff99)
    .setAuthor(content[0])
    .setTitle(content[1])
    .setDescription(`${content[2]}\n${content[3]}`)
    .setTimestamp()
    .setFooter('Announcement Japanisme')
    client.channels.cache.find(ch => ch.id === '741726410628006020').send(announce)
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

const Discord = require('discord.js')
exports.run = async (message, client, args) => {
  let data = args.join(' ')
  let rest_of_the_string = message.content.slice(data.length); //removes the first part
    let array_of_arguments = rest_of_the_string.split(','); //[title, description, link, image]

    let embed = new Discord.MessageEmbed()
      .setColor(0x00AE86)
      .setTitle(array_of_arguments[0])
      .setDescription(array_of_arguments[1])
      .setImage(array_of_arguments[3])
      .setURL(array_of_arguments[2])
      .addField("Text", true)
      .setThumbnail("https://i.imgur.com/Rmiwd1j.png")
      .setFooter("Footer", array_of_arguments[3])
      .setTimestamp();

    message.channel.send({ embed });
}
module.exports.help = {
  name: "announce"
}

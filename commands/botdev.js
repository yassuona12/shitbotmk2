const Discord = require('discord.js')
exports.run = async (client, message, args) => {
  let embed = new Discord.MessageEmbed()
  .setAuthor('Japanisme Bot Development')
  .setDescription(`<@Rapentot> <@Orchit> `)
  message.channel.send(embed)
  }

module.exports.help = {
  name: 'botdev'
 }

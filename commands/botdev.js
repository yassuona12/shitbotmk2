const Discord = require('discord.js')
const botSettings = require("../botsettings.json")

exports.run = async (client, message, args) => {
  
  let embed = new Discord.MessageEmbed()
  .setColor(0x0099ff)
  .setAuthor('Japanisme Bot Development')
  .setDescription(`${botSettings.dev1} ${botSettings.dev2}`)
  message.channel.send(embed)
  
  
  }
module.exports.help = {
  name: 'botdev'
 }

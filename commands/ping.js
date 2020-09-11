
const Discord = require('discord.js');

module.exports.run = (bot, message) => {
  let embed = new Discord.MessageEmbed()

   .setDescription(`🛑Pong! It took **${Math.abs(Date.now() - message.createdTimestamp)}**ms`);

  message.channel.send({embed: embed})
};

module.exports.help = {
  name: "ping"
};
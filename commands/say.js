const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const botS = require('../botsettings.json')
const prefix = botS.prefix
module.exports.run = async (bot, message, args) => {

  message.delete();
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return errors.noPerms(message, "MANAGE_MESSAGES");
  let embed = new Discord.MessageEmbed()
  .setColor('RANDOM')
  .setTitle('Say Commands')
  .setDescription(`**<usage>: \`${prefix}say [message]\`\n<example>: \`${prefix}say halo\`**`)
  let botmessage = args.join(" ");
  if(!botmessage) return message.channel.send(embed)
  message.channel.send(botmessage);
}

module.exports.help = {
  name: "say"
}
const Discord = require("discord.js");
exports.run = async (bot, message, args) => {
if (message.channel instanceof Discord.DMChannel) return;
    if(!message.member.hasPermission('MANAGE_ROLES') || !message.member.hasPermission(["KICK_MEMBERS", "BAN_MEMBERS"]) || !message.guild.owner) return message.reply("You haven't the permission to use this command!");
  
  let mentionedUser = message.mentions.users.first();
  
  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
  if(!tomute) return message.reply('Please mention members first');
  
   if(tomute.hasPermission("ADMINISTRATOR")) return message.reply("I can't umute this member");
  let muterole = message.guild.roles.cache.find(r => r.name === 'JPMute');
  
  tomute.roles.remove(muterole.id);
  
  const unmute = new Discord.MessageEmbed()
  .setColor('#fc0000')
  .setDescription(`**${mentionedUser.tag} Has Been Unmuted!**`)
    message.delete()
    message.channel.send(unmute).then(msg => {msg.delete({  timeout: 60000  })});
  
}
module.exports.help = {
  name : "unmute"
}
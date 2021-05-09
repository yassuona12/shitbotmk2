const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
  let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
  if(!rUser) return message.channel.send("Couldn't find user.");
  let reason = args.join(" ").slice(22);

  let reportEmbed = new Discord.MessageEmbed()
    .setAuthor(`Member di cepuin`)
    .setColor("#E5DA2A")
    .setThumbnail(message.mentions.users.first().avatarURL)
    .addField("yang di cepuin", `${rUser}`)
    .addField("cepu", `${message.author}`)
    .addField("Channel TKP", message.channel)
    .addField("alesannya", reason)
    .setTimestamp()
  .setFooter("cepu moment", message.guild.iconURL);

  //return message.channel.send(reportEmbed); //send msg in current channel
  let reportsChannel = message.guild.channels.cache.find(ch => ch.name === "🤰・Report") //TODO: set reports channel
  if(!reportsChannel) return message.channel.send("Couldn't find reports channel.");

  message.delete().catch(O_o=>{}); //delete previous message (input command)
  return reportsChannel.send("ada yg cepu nih bro", reportEmbed);
}

module.exports.help = {
  name : "report"
}
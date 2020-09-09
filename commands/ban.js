const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {
    message.delete();
    if(!message.member.hasPermission("BAN_MEMBERS")) return errors.noPerms(message, "BAN_MEMBERS");
    if(args[0] == "help"){
      message.reply("Usage: !ban <user> <reason>");
      return;
    }
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author);
    if(!bUser) return message.channel.send('Member tidak ditemukan');
    if(bUser.id === bot.user.id) return message.channel.send('Member tidak bisa membanned diri sendiri');
    let bReason = args.join(" ").slice(22);
    if(!bReason) return message.channel.send('Silahkan beri alasan');
    if(bUser.hasPermission("BAN_MEMBERS")) return message.channel.send('Member ini tidak bisa di baned');

    let banEmbed = new Discord.MessageEmbed()
    .setDescription("~Ban~")
    .setColor("#bc0000")
    .addField("Banned User", `${bUser} with ID ${bUser.id}`)
    .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Banned In", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", bReason);

    let incidentchannel = message.guild.channels.find(ch => ch.name = "⌘・bots◟log");
    if(!incidentchannel) return message.channel.send("Can't find incidents channel.");

    message.guild.member(bUser).ban(bReason);
    incidentchannel.send(banEmbed);
}

module.exports.help = {
  name:"ban"
}
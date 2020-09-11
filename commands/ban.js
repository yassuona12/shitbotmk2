const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {
    message.delete();
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(`You did'n have permission to ban members`);
    
  if(!message.member.hasPermission("ADMINISTRATOR") && message.author.id !== "243728573624614912") return message.channel.send("Kalau gapunya Permission, Gausah nyoba - nyoba!");

    let member = message.guild.member(message.mentions.members.first()) || message.guild.members.cache.get(args[0]);
    if(!member) return message.channel.send('<usage>: j!ban [members]')
    if(member.hasPermission("ADMINISTRATOR")) return message.channel.send("Member ini tidak bisa di *Ban*")

  if(member.id === message.author.id) return message.channel.send("Kamu tidak bisa meng-*Ban* diri sendiri")

    let reason = args.join(" ").slice(22);

    if(!reason) {
        reason = "Tidak Ada";
    }


    let banEmbed = new Discord.MessageEmbed()
    .setDescription("~Ban~")
    .setColor("#bc0000")
    .addField("Banned User", `${member} with ID ${member.id}`)
    .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Banned In", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", reason);

    let incidentchannel = message.guild.channels.find(ch => ch.name = "⌘・bots◟log");
    if(!incidentchannel) return message.channel.send("Can't find incidents channel.");

    message.guild.member(member).ban(reason);
    incidentchannel.send(banEmbed);
}

module.exports.help = {
  name:"ban"
}
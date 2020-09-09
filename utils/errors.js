const Discord = require("discord.js");
const fs = require("fs");
let config = require("../botsettings.json");

module.exports.noPerms = (message, perm) => {
    let embed = new Discord.MessageEmbed()
        .setAuthor(message.author.username)
        .setTitle("Insufficient Permission")
        .setColor(config.red)
        .addField("Permission needed", perm);

    message.channel.send(embed).then(m => m.delete(5000));
}

module.exports.equalPerms = (message, user, perms) => {

    let embed = new Discord.MessageEmbed()
        .setAuthor(message.author.username)
        .setColor(config.red)
        .setTitle("Error")
        .addField(`${user} has perms`, perms);

    message.channel.send(embed).then(m => m.delete(5000));

}

module.exports.botuser = (message) => {
    let embed = new Discord.MessageEmbed()
        .setTitle("Error")
        .setDescription("i can't ban that bot.")
        .setColor(config.red);

    message.channel.send(embed).then(m => m.delete(5000));
}

module.exports.cantfindUser = (channel, msg) => {
    let embed = new Discord.MessageEmbed()
        .setTitle("Error")
        .setDescription("Could not find that user.")
        .setColor('RED');

    channel.send(embed).then(msg => msg.delete(5000));
}

module.exports.noReason = (channel) => {
    let embed = new Discord.MessageEmbed()
        .setTitle("Error")
        .setDescription("pls give a reason.")
        .setColor(config.red);

    channel.send(embed).then(m => m.delete(5000));
}
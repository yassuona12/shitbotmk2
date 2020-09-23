let Discord = require('discord.js');


module.exports.run = (client, message, args) => {
    if (message.channel instanceof Discord.DMChannel) return message.channel.send("This command is not avaiable in DMs");

    if (!message.member.hasPermission("KICK_MEMBER"))return message.channel.send("Maaf, Anda tidak punya izin untuk melakukan command ini")

    let logchannel = message.guild.channels.cache.find(c => c.name === "⌘・bots◟log");
    if (!logchannel) return;

    let tokick = message.mentions.members.first()
    if (!tokick) return message.channel.send("❎ **| I can't find the user. Can you make sure you have entered a correct one?**");

    let reason = args.slice(1).join(" ");
    if (!reason) reason = 'Not specified.';

    tokick.kick(reason).then(() => {
        let embed = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL)
            .setColor("PURPLE")
            .setTimestamp(new Date())
            .setTitle("Kick executed")
            .addField("Kicked user: " + tokick.username, "User ID: " + tokick.id)
            .addField("=========================", "Reason:\n" + reason);

        logchannel.send(embed)
    })
};



module.exports.help = {
    name: "kick"
};
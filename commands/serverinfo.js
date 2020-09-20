const Discord = require("discord.js");
const moment = require('moment');
moment.locale();
module.exports.run = async(bot, message, args) => {
let icon = message.guild.iconURL({  dynamic: true  })
let serverid = message.guild.id
let servercreated = moment(message.guild.createdAt).format('ll');
    message.delete();
      let serverEmbed = new Discord.MessageEmbed()
        .setAuthor(message.guild.name, (icon)) 
        .setColor("#15f153")
        .setThumbnail(icon)
        .addField("Server Name", `❱ **\`${message.guild.name} - ${message.guild.id}\`**`)
        .addField("Server Owner", `❱ **\`${message.guild.owner.user.tag}\`**`)
        .addField("Server Region", `❱ **\`${message.guild.region}\`**`, true)
        .addField("Verification", `❱ **\`${message.guild.verificationLevel}\`**`, true) 
        .addField("Channels", `❱ **\`${message.guild.channels.cache.size}\`**`, true)
        .addField("Total Joined", `❱ **\`${message.guild.members.cache.size}\`**`, true)
        .addField("Roles", `❱ **\`${message.guild.roles.cache.size}\`**`, true)
        .addField('Booster', `❱ **\`${message.guild.premiumSubscriptionCount || '0'}\`**`, true)
        .addField("Server Created", `❱ **\`${servercreated}\`**`, true)
        .setFooter(`❱ ${message.guild.name}`, bot.user.displayAvatarURL())
        .setTimestamp();
      message.channel.send(serverEmbed).then (msg => msg.delete({  timeout: 60000  }));
}

module.exports.help = {
  name : "serverinfo"
}
const Discord = require("discord.js");
const moment = require('moment');
moment.locale();
module.exports.run = async(bot, message, args) => {
let servercreated = moment(message.guild.createdAt).format('ll');
      let serverEmbed = new Discord.MessageEmbed()
        .setDescription("Server Info")
        .setColor("#15f153")
        .setThumbnail(message.guild.iconURL)
        .addField("Server Name", `❱ **\`${message.guild.name}\`**`, true)
        .addField("Server Owner", `❱ **\`${message.guild.owner.user.tag}\`**`, true)
        .addField("Server Region", `❱ **\`${message.guild.region}\`**`, true)
        .addField("Verification", `❱ **\`${message.guild.verificationLevel}\`**`, true) 
        .addField("Channels", `❱ **\`${message.guild.channels.cache.size}\`**`, true)
        .addField("Total Joined", `❱ **\`${message.guild.members.cache.size}\`**`, true)
        .addField("Roles", `❱ **\`${message.guild.roles.cache.size}\`**`, true)
        .addField('Booster', `❱ **\`${message.guild.premiumSubscriptionCount || '0'}\`**`, true)
        .addField("Creation Date", `❱ \`**${servercreated}\`**`, true)
        .setThumbnail(message.guild.iconURL)
        .setFooter(`**ID: ${message.guild.id}**`)
        
  
      message.channel.send(serverEmbed);
}

module.exports.help = {
  name : "serverinfo"
}
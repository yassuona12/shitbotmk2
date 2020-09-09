const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
  let helpIcon = bot.user.displayAvatarURL;
  let helpEmbed = new Discord.MessageEmbed()
    .setTitle("❱ Japanisme Bot Commands", bot.user.displayAvatarURL())
    .setDescription(`hello this is a list of Japanisme bot commands \nif you have any suggestions, you can tag our developer ^^`)
    .setColor("#20C20E")
    .setThumbnail(bot.user.displayAvatarURL({ dynamic:true  }))
    .addField("❱ General", "**``help 8ball kiss hug userinfo ping coinflip hello avatar say serverinfo report``**")
    .addField("❱ Moderator","**``tempmute kick clear unban ban mute``**")
    .setTimestamp()
    .setFooter(`❱ ${message.guild.name}`, bot.user.displayAvatarURL())

  message.channel.send(helpEmbed);
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['h'],
    permLevel: 0
  };

module.exports.help = {
  name : "help"
}
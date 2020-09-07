const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
  let helpIcon = bot.user.displayAvatarURL;
  let helpEmbed = new Discord.RichEmbed()
    .setTitle("Japanisme Bot Commands")
  .setDescription(`hello this is a list of Japanisme bot commands \nif you have any suggestions, you can tag our developer ^^`)
    .setColor("#20C20E")
    .setThumbnail("https://cdn.discordapp.com/attachments/662732338563907597/751000918757081128/IMG-20200830-WA0005.jpg")
    .addField("General", "**``help 8ball kiss hug userinfo ping coinflip hello avatar say serverinfo report``**")
    .addField("Moderator","**``tempmute kick clear unban ban mute``**")
    .setTimestamp()
    .setFooter("Japanisme", message.guild.iconURL);

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
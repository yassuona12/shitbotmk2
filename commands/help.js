const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
  let helpIcon = bot.user.displayAvatarURL;
  let helpEmbed = new Discord.RichEmbed()
    .setTitle("Univers Cafe Bot Commands")
  .setDescription(`this bos has been modified by <@454680245937635339>
for new feature please tag <@454680245937635339> ðŸ˜˜`)
    .setColor("#20C20E")
    .setThumbnail("https://cdn.discordapp.com/attachments/662732338563907597/751000918757081128/IMG-20200830-WA0005.jpg")
    .addField("General", "``help 8ball kiss hug userinfo ping coinflip hello avatar say serverinfo report``")
    .addField("Moderator","``tempmute kick clear unban ban mute``")
    .setTimestamp()
    .setFooter("Univers Cafe", message.guild.iconURL);

  message.channel.send(helpEmbed);
}

module.exports.help = {
  name : "help"
}
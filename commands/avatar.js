const Discord =  require('discord.js');

exports.run = (client, message, args) => {
    let avatar = message.mentions.users.size ? message.mentions.users.first().avatarURL : message.author.avatarURL;
    if (message.mentions.users.size > 0) {
      const embed = new Discord.RichEmbed()
        .setColor(0xFFFF00)
        .setTitle(`Avatar for ${message.mentions.users.tag} :`)
        .setImage(message.mentions.users.first().avatarURL)
        .setTimestamp()
        .setFooter(`JAPANISME`, message.guild.iconURL);
        message.channel.send({embed : embed}); 
    } else {
      const embed = new Discord.RichEmbed()
      .setColor(0xFFFF00)
      .setTitle(`Avatar for ${message.mentions.first}:`)
      .setImage(message.User.avatarURL)
      .setTimestamp()
      .setFooter(`JAPANISME`, message.guild.iconURL);
      message.channel.send({embed});
    }
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'avatar',
  description: 'Fetches a user\'s avatar.',
  usage: 'avatar <user>'
};
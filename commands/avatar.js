const Discord =  require('discord.js');

exports.run = (client, message, args) => {
    let mentionedUser = message.mentions.users.first() || message.author;
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
      const embed = new Discord.MessageEmbed()
        .setColor(0xFFFF00)
        .setTitle(`Avatar for ${mentionedUser.tag} :`)
        .setImage(`${mentionedUser.displayAvatarURL({dynamic: true, size: 4096})}`)
        .setTimestamp()
        .setFooter(`Betty`, message.guild.iconURL);
        message.channel.send(embed); 
        message.delete();
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
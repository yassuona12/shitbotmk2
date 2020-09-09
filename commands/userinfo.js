const moment = require('moment');
const Discord = require('discord.js');
function checkDays(date) {
  let now = new Date();
  let diff = now.getTime() - date.getTime();
  let days = Math.floor(diff / 86400000);
  return days + (days == 1 ? " day" : " days") + " ago";
};
exports.run = async (client, msg, args) => {
  let user = msg.mentions.users.first() || msg.author;
  let muser = msg.guild.member(msg.mentions.users.first()) || msg.member;
  const roles = muser.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString()).slice(0, -1);
  const embed = new Discord.MessageEmbed()
          .setThumbnail(user.avatarURL)
          .setColor(3447003)
          .addField("Username", `${user.tag} - ${user.id}`)
          .addField('Status', `${muser.presence.status}`, true)
          .addField('Game', `${muser.presence.game ? user.presence.game.name : 'None'}`, true)
          .addField('Account Created', `${moment(user.createdAt).toString().substr(0, 15)}`, true)
          .addField('Account Joined', `${moment(muser.joinedAt).toString().substr(0, 15)}`, true)
          .addField('Roles', `${roles.length < 500 ? roles.join('') : roles.length > 500 ? this.client.utils.trimArray(roles) : 'None'}`, true)
          .setTimestamp()
          .setFooter(msg.guild.name, msg.guild.iconURL);
      msg.channel.send({embed});

//     const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
//     const mentionedUser = message.mentions.users.first() || message.author;
//     const roles = member.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString()).slice(0, -1);
// 		const userFlags = mentionedUser.flags.toArray();
//     const date = moment(mentionedUser.createdAt).format('ll');
    
//     const embed = new MessageEmbed()
//           .setThumbnail(mentionedUser.displayAvatarURL({ dynamic: true, size: 512 }))
//           .setColor('ff85cc')
//           .setFooter("Creator Beel")
//           .setTimestamp(message.createdTimestamp)
//           .addField('Username | Tags', `${mentionedUser.tag} | ${mentionedUser.discriminator}`)
//           .addField('ID', `${mentionedUser.id}`)
//           .addField('Badges', `${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}`)
//           .addField('Join Date', `${moment(member.joinedAt).format('LL LTS')}`)
//           .addField('Created At', (date))
//           .addField('Roles', `${roles.length < 500 ? roles.join(', ') : roles.length > 500 ? this.client.utils.trimArray(roles) : 'None'}`) 
//       message.channel.send(embed)
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["userstats"],
  permLevel: 0
};

exports.help = {
  name: 'userinfo',
  description: 'Displays information about a user.',
  usage: 'userinfo <@user>'
};
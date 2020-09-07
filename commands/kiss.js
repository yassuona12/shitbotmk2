const Discord = require('discord.js');
const superagent = require('superagent');

exports.run = async (client, message, args, tools) => {
    if (!message.mentions.users.first()) return message.reply("You need to mention someone to kiss them");
    const { body } = await superagent
    .get("https://nekos.life/api/kiss");
    
    const embed = new Discord.RichEmbed()
    .setColor("#ff9900")
    .setTitle(`OwO, ${message.author.username} kissed ${message.mentions.users.first().username}`)
    .setImage(body.url) 
    .setTimestamp()
    .setFooter(`Univers Cafe`, message.guild.iconURL);
    message.channel.send({embed})
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: 'kiss',
    description: 'Kisses someone OwO',
    usage: 'kiss'
  };
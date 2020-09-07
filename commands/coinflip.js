const Discord = require('discord.js')
exports.run = async (bot, message, args) => {
  let random = (Math.floor(Math.random() * Math.floor(2)));
  const user = message.author
        if(random === 0) {
          const heads = new Discord.RichEmbed()
          .setAuthor(`${user.tag} I Flipped Heads`)
          .setImage("https://cdn.discordapp.com/attachments/454680816061120513/689019575592943626/IMG_20200316_155631.jpg")
          message.channel.send(heads);
        }
        else {
          const tails = new Discord.RichEmbed()
          .setAuthor(`${user.tag} I Flipped Tails`)
          .setImage("https://cdn.discordapp.com/attachments/454680816061120513/689019762529140765/IMG_20200316_155650.jpg")
          message.channel.send(tails);
        }
},

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
exports.help = {
    name: 'coinflip',
    description: 'Flip a Coin',
    usage: 'coinflip'
  };
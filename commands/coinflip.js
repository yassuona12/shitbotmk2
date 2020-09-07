exports.run = async (bot, message, args) => {
  let random = (Math.floor(Math.random() * Math.floor(2)));

        if(random === 0) {
          message.channel.send(`I flipped heads!${files = ["https://cdn.discordapp.com/attachments/454680816061120513/689019575592943626/IMG_20200316_155631.jpg"] }`);
        }
        else {
          message.channel.send('I flipped tails!');
        }
      message.channel.send({files : ["https://cdn.discordapp.com/attachments/454680816061120513/689019575592943626/IMG_20200316_155631.jpg"] });
    }
    else {
      message.channel.send({files : ["https://cdn.discordapp.com/attachments/454680816061120513/689019762529140765/IMG_20200316_155650.jpg"] });
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
  };h
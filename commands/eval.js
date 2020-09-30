const Discord = require('discord.js')
const db = require('quick.db')
let config = require('../config.json')
module.exports.run = async (client, message, song) => {
    if(
    message.author.id !== config.id1 &&
      message.author.id !== config.id2
    ) return message.channel.send('Kamu bukan developer, hanya developer yang dapat menggunakan command ini')
  message.delete()
    const args = message.content.split(" ").slice(1);
  try {
    function clean(text) {
      if (typeof text === "string")
        return text
          .replace(/`/g, "`" + String.fromCharCode(8203))
          .replace(/@/g, "@" + String.fromCharCode(8203));
      else return text;
    }
        let codein = args.join(" ");
        let code = await eval(codein);

        if (typeof code !== 'string')
            code = require('util').inspect(code, { depth: 0 });
        let embed = new Discord.MessageEmbed()
        .setAuthor('Eval Commands')
        .setColor('RANDOM')
        .addField(':inbox_tray: Input', `\`\`\`js\n${codein}\`\`\``)
        .addField(":outbox_tray: Output", `\`\`\`js\n${clean(code).replace(client.token, "NO TOKEN FOR YOU!")}\n\`\`\``)
        message.channel.send(embed)
    } catch(e) {
        
        message.channel.send(`\`\`\`js\n${e}\n\`\`\``);
    }
  
}
module.exports.help = {
  name : "eval"
}
  const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message) => {

  if(!message.member.hasPermission("MANAGE_MESSAGES")) return errors.noPerms(message, "MANAGE_MESSAGES");
  if(!args[0]) return message.channel.send("jumlahnya mau berapa kk?").then(msg => msg.delete(5000));
  const args = message.content.split(' ').slice(1);
  const amount = args.join(' ');
  message.delete();
  if (isNaN(amount)) return message.reply('Harap masukkan angka yang tepat');
  if (amount > 99) return message.reply('Tidak Bisa melebihi 99 pesan');
  if (amount < 1) return message.channel.send('Usage j!clear <amount>')
}

module.exports.help = {
  name: "clear"
}
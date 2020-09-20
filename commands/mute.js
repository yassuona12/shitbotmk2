const Discord = require('discord.js');
exports.run = async (bot, message, args) => {
  
  if(!message.member.hasPermission('MANAGE_ROLES') || !message.member.hasPermission(["KICK_MEMBERS", "BAN_MEMBERS"]) || !message.guild.owner) return message.reply("Kamu tidak memiliki izi untuk menggunakan perintah ini");
	if(!message.guild.me.hasPermission(["MANAGE_ROLES","ADMINISTRATOR"])) return message.reply("Saya tidak memiliki izin yang diperlukan");
  let mentionedUser = message.mentions.users.first();
	let toMute = message.mentions.members.first();
	if(!toMute) return message.channel.send('Silahkan Mention Member Terlebih Dahulu');
  if(toMute.hasPermission("ADMINISTRATOR")) return message.reply("Member ini tidak bisa di mute");  
  
	let reason = args.slice(1).join(" ");
	if(!reason) reason = "No reason given";
  
	let muteRole = message.guild.roles.cache.find(r => r.name === "JPMute");
	if(!muteRole) {
		try {
			muteRole = await message.guild.roles.create({
				data: {
					name: "JPMute",
					color: "#514f48",
					permissions: []
				}
			});
		} catch (error) {
        console.log('an error has occurred')
        console.log('')
      }
	}
  
	message.guild.channels.cache.forEach((channel) => {
		channel.updateOverwrite(muteRole, {
			"SEND_MESSAGES": false,
			"ATTACH_FILES": false,
			"SEND_TTS_MESSAGES": false,
			"ADD_REACTIONS": false,
			"SPEAK": false,
			"STREAM": false
		});
	});
	const muteConfirm = new Discord.MessageEmbed()
	.setColor('RANDOM')
	.setDescription(`✅ **${mentionedUser.tag} has been successfully muted!\nReason: __${reason}__**`);
	toMute.roles.add(muteRole.id).then(() => {
		message.delete()
		message.channel.send(muteConfirm).then(msg => {msg.delete({  timeout: 60000  })})
	});
}
module.exports.help = {
  name : "mute"
}
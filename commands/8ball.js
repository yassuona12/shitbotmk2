const Discord = require("discord.js");

exports.run = async (bot, message, args) => {
    if(!args[1]) return message.reply("Please ask a full question");
    let replies = [
        'Mungkin.',
	    'tentu tidak.',
	    'saya berharap begitu.',
	    'mimpi ya?.',
    	'gak ada kesempatan bagus cuy',
	    'OOF sorry bro....',
    	'gak mungkin terjadi.',
    	'moga aja tidak.',
    	'moga aja terjadi.',
    	'gak akan!',
    	'jir.',
	    'sorry lur .',
    	'Hell yes',
    	'nope.',
    	'gatau gelap cuy masa depan lu.',
	    'gak pasti men.',
	    'w lebih pilih gak ngomong dah.',
    	'emg gweh peduli',
    	'kemungkinan gitu.',
    	'gak akan cuy yahaha hayyuk!.',
    	'rng lagi males sama lu chance lu kecil.',
    	'Yoi!',
    	'yahaha,No!.',
    	'...',
    	'gatau',
    	'bukan urusan gweh,gweh kan cuman bot.',
        'klo lu aja nanya gweh trus gweh nanya sapa?.',
      'mungkin gaakan bro sorry ye' , 
      'segera'
    ];

    let result = Math.floor((Math.random() * replies.length));
    let question = args.slice(0).join(" ");

    let embed = new Discord.MessageEmbed()
    .setTitle("8BALL")
    .setColor("#AA9900")
    .addField("Q:", question)
    .addField("A:", replies[result])
    .setFooter("Japanisme", message.guild.iconURL)
    .setTimestamp();

    message.channel.send(embed);
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
exports.help = {
    name: '8ball',
    description: 'Ask the bot a Question.',
    usage: '8ball (question)'
}
const botSettings = require("./botsettings.json")
const Discord = require("discord.js");
const fs = require("fs");
const request = require("request");
const client = new Discord.Client();
const prefix = botSettings.prefix;

const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

fs.readdir("./commands", (err, files) => {
    if(err) console.error(err);

    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if(jsfiles.length <= 0) {
        console.log("No commands found to load!");
        return;
    }

    console.log(`Loading ${jsfiles.length} commands!`);

    jsfiles.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`${i + 1}: ${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });
});

bot.on("ready", async () => {
console.log(`Bots is ready and working in ${bot.guilds.size} servers with ${bot.users.size} users!`);

 
/*setInterval(() => {
        dbl.postStats(bot.guilds.size);
    }, 1800000); */
    
bot.user.setStatus('Online')

bot.user.setActivity(`in ${bot.guilds.size} Servers | !help`);
    
    

try {
    let link = await bot.generateInvite(["ADMINISTRATOR"]);
    console.log(link);
    } catch(e) {
        console.log(e.stack);
        }
});
     
bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;  

    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);

    if(!command.startsWith(prefix)) return;

    let cmd = bot.commands.get(command.slice(prefix.length));
    if(cmd) cmd.run(bot, message, args);
    
});

bot.login(process.env.TOKEN);

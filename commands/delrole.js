const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {

  //!addrole @andrew Dog Person
  if (!message.member.hasPermission("MANAGE_ROLES")) return errors.noPerms(message, "MANAGE_ROLES");
  if (args[0] == "help") {
    message.reply("Usage: !addrole <user> <role>");
    return;
  }
let member = message.mentions.users.first() || message.author;
    let role = message.mentions.roles.first()
    let members = message.mentions.members,
    roles = message.mentions.roles;

  if (!members.size) return;
  if (!roles.size) return;

  members.forEach(member => member.roles.remove(roles)) 
  return message.channel.send(`${member} has removed from role ${role}`)
}

module.exports.help = {
  name: "delrole"
}

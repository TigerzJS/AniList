
const Discord = require("discord.js");
const db = require("quick.db")

module.exports = function (client) {
  console.log(`:: ⬜️ Module: prefix\n`)


  client.on("message", message => {

    const PREFIX = db.get(`guild_${message.guild}_prefix`) || "!"
    if(!message.content.startsWith(PREFIX)) return
    const args = message.content.substring(PREFIX.length).split(" ")

    const noperm = new Discord.MessageEmbed()
    .setTitle('ERROR')
    .setDescription('You have no **rights** to perform this action')
    .setColor("FF0000")

const specify = new Discord.MessageEmbed()
    .setTitle('ERROR')
    .setDescription('You need to specify a **Prefix**')
    .setColor("FF0000")
    
const PLength = new Discord.MessageEmbed()
    .setTitle('ERROR')
    .setDescription('**Your prefix may only contain a maximum of 3 characters**')
    .setColor("RANDOM")

const already = new Discord.MessageEmbed()
    .setTitle('ERROR')
    .setDescription(`**The prefix ${args[1]} is already in use on the server**`)
    .setColor("#FF0000")

const prefix = new Discord.MessageEmbed()
    .setTitle('SUCCESS')
    .setDescription(`**Your new prefix has now been changed to: ${args[1]}**`)
    .setColor("#3ADF00")

const sos = new Discord.MessageEmbed()
    .setTitle('ERROR')
    .setDescription(`**Your prefix has now been reset to: !**`)
    .setColor("#3ADF00")

    if(message.content.startsWith(`${PREFIX}prefix`)) {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(noperm)
        if(!args[1]) return message.channel.send(specify)
        if(args[1].length > 3) return message.channel.send(PLength)
        if(args[1] == db.get(`guild_${message.guild.id}_prefix`)) return message.channel.send(already)
        if(args[1] == "!") db.delete(`guild_${message.guild.id}_prefix`)
        db.set(`guild_${message.guild}_prefix`, args[1])
        return message.channel.send(prefix)
    }
})

client.on("message", message => {

    const PREFIX = ["!"]
    if(!message.content.startsWith("!")) return
    const args = message.content.substring(PREFIX.length).split(" ")



const sos = new Discord.MessageEmbed()
    .setTitle('SUCCESS')
    .setDescription(`**Your prefix has now been reset to: !**`)
    .setColor("#3ADF00")

    if(message.content.startsWith(`!prefix-reset`)) {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(noperm)
        db.set(`guild_${message.guild.id}_prefix`, `!`) 
        message.channel.send(sos)

    }
})

  function delay(delayInms) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(2);
      }, delayInms);
    });
  }
}
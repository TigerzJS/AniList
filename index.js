const Discord = require("discord.js");       
const client = new Discord.Client();        
const config = require("./config.json");   
const Enmap = require("enmap")              
const db = require("quick.db")                     

const prefix = require("./prefix")
prefix(client)

const search = require("./search")
search(client)

client.login(config.TOKEN)


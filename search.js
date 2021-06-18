const discord = require('discord.js');
const { set } = require('quick.db');
const db = require('quick.db')
const anilist = require('anilist-node');
const Anilist = new anilist();
module.exports = function (client) {
    
    console.log(`:: ⬜️ AniSearch Loaded\n`)
    client.on("message", message => {
        const PREFIX = db.get(`guild_${message.guild}_prefix`) || "!"
        if(!message.content.startsWith(PREFIX)) return
        const args = message.content.slice(PREFIX.length).trim().split(' ')
        const command = args.shift().toLowerCase();
        if(command === 'ani') //finds anime
        {
            console.log(args)
            aniargs = args.join(" ")
            Anilist.searchEntry.anime(aniargs)
            .then((data) => { 
            console.log(data.media[0].title.english)
            Anilist.media.anime(data.media[0].id)
            .then(data1 => {
              const aniinfo = new discord.MessageEmbed()
                .setTitle(data.media[0].title.english)
                .setDescription(data1.averageScore)
              message.channel.send("https://anilist.co/anime/"+data.media[0].id)   
            
            })
            })
        }
        if(command === 'aniu') //finds user
        {
            console.log(args)
            aniargs1 = args.join(" ")
            Anilist.searchEntry.user(aniargs1)
            .then((data) => {
            console.log(data.users[0].id)
            message.channel.send("https://anilist.co/user/"+data.users[0].id)
            })
        }
        if(command === 'act') //shows recent activity
        {
          console.log(args)
          aniargs2 = args.join(" ")
          Anilist.searchEntry.user(aniargs2)
          .then((data) => {
          console.log(data.users[0].id)
          Anilist.user.getRecentActivity(data.users[0].id)
          .then(data1 => {
            Anilist.user.profile(data.users[0].id)
            .then(data2 => {
              //console.log(data2)
              //console.log(data1[0].media.title.english)
              //console.log(data1[0].status)
              //console.log(data1[0].progress)
              //console.log(data1[0].media.type)
              progress0 = ""
              progress1 = ""
              progress2 = ""
              progress3 = ""
              progress4 = ""
              if ( data1[0].progress != null ) //checking if the progress0 exists
              {
                progress0 = ":"+data1[0].progress
              }
              if ( data1[1].progress != null ) //checking if the progress1 exists
              {
                progress1 = ":"+data1[1].progress
              }
              if ( data1[2].progress != null ) //checking if the progress2 exists
              {
                progress2 = ":"+data1[2].progress
              }
              if ( data1[3].progress != null ) //checking if the progress3 exists
              {
                progress3 = ":"+data1[3].progress
              }
              if ( data1[4].progress != null ) //checking if the progress4 exists
              {
                progress4 = ":"+data1[4].progress
              }
              const statsuembed = new discord.MessageEmbed()
                .setTitle(data2.name)
                .setDescription("*Recent Activity*")
                .addField(`${data1[0].media.title.english}`, `${data1[0].status}${progress0}`)
                .addField(`${data1[1].media.title.english}`, `${data1[1].status}${progress1}`)
                .addField(`${data1[2].media.title.english}`, `${data1[2].status}${progress2}`)
                .addField(`${data1[3].media.title.english}`, `${data1[3].status}${progress3}`)
                .addField(`${data1[4].media.title.english}`, `${data1[4].status}${progress4}`)
                .setThumbnail(`${data2.avatar.medium}`)
                .setFooter("AniList", "https://media.discordapp.net/attachments/810484631283433532/848566329153159218/android-chrome-512x512.png")
              message.channel.send(statsuembed)
            })
          })
          })
        }

        if(command === 'recu') //anime recommendation based on user
        {
          console.log(args)
          aniargs3 = args.join(" ")
          Anilist.searchEntry.user(aniargs3)
          .then((data) => {
          console.log(data.users[0].id)
          Anilist.user.getRecentActivity(data.users[0].id)
          .then(data1 => {
            Anilist.user.profile(data.users[0].id)
          .then(data2 => {
            console.log(data2.favourites.anime)
            if(data2.favourites.anime != "")
            {
              Anilist.media.anime(data2.favourites.anime[0].id)
              .then(data3 => {
                console.log(data3.recommendations[0])
                const recommendation = new discord.MessageEmbed()
                  .setTitle(`Recommendation for ${data2.name}`)
                  .addField(`${data3.recommendations[0].mediaRecommendation.title.userPreferred}`, `[Click here](https://anilist.co/anime/${data3.recommendations[0].mediaRecommendation.id})`)
                  .addField(`${data3.recommendations[1].mediaRecommendation.title.userPreferred}`, `[Click here](https://anilist.co/anime/${data3.recommendations[1].mediaRecommendation.id})`)
                  .addField(`${data3.recommendations[2].mediaRecommendation.title.userPreferred}`, `[Click here](https://anilist.co/anime/${data3.recommendations[2].mediaRecommendation.id})`)
                  .addField(`${data3.recommendations[3].mediaRecommendation.title.userPreferred}`, `[Click here](https://anilist.co/anime/${data3.recommendations[3].mediaRecommendation.id})`)
                  .addField(`${data3.recommendations[4].mediaRecommendation.title.userPreferred}`, `[Click here](https://anilist.co/anime/${data3.recommendations[4].mediaRecommendation.id})`)
                message.channel.send(recommendation)
              })
            }
            else 
            {
              const nofavourites = new discord.MessageEmbed()
              .setTitle("⚠️Recommendation for "+data2.name)
              .setDescription(`**Sorry ${data2.name} does not have any animes rated 10/10**`)
              .setColor("RED")
              message.channel.send(nofavourites)
            }
          })
          })
        })
        }
        if(command === 'rec') //anime recommendation based on anime
        {
          console.log(args)
            aniargs4 = args.join(" ")
            Anilist.searchEntry.anime(aniargs4)
            .then((data) => { 
            console.log(data.media[0].title.english)
            Anilist.media.anime(data.media[0].id)
            .then(data1 => {
              console.log(data1.recommendations[0])
              const recommendation = new discord.MessageEmbed()
              .setTitle(`Recommendation for ${data.media[0].title.english}`)
              .addField(`${data1.recommendations[0].mediaRecommendation.title.english}`, `[Click here](https://anilist.co/anime/${data1.recommendations[0].mediaRecommendation.id})`)
              .addField(`${data1.recommendations[1].mediaRecommendation.title.english}`, `[Click here](https://anilist.co/anime/${data1.recommendations[1].mediaRecommendation.id})`)
              .addField(`${data1.recommendations[2].mediaRecommendation.title.english}`, `[Click here](https://anilist.co/anime/${data1.recommendations[2].mediaRecommendation.id})`)
              .addField(`${data1.recommendations[3].mediaRecommendation.title.english}`, `[Click here](https://anilist.co/anime/${data1.recommendations[3].mediaRecommendation.id})`)
              .addField(`${data1.recommendations[4].mediaRecommendation.title.english}`, `[Click here](https://anilist.co/anime/${data1.recommendations[4].mediaRecommendation.id})`)
            message.channel.send(recommendation)
            })
          })
        }
    })
}
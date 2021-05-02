const fs = require('fs') 
const { Client, Collection } = require('discord.js') 
require('dotenv').config() 

const client = new Client() 

client.commands = new Collection() 

client.config = require('./config') 

//Load events from event folder
fs.readdir('./events/', (err, files) => {
  if (err) return console.error 
  files.forEach(file => {
    if (!file.endsWith('.js')) return 
    const evt = require(`./events/${file}`) 
    let evtName = file.split('.')[0] 
    console.log(`Loaded event '${evtName}'`) 
    client.on(evtName, evt.bind(null, client)) 
  }) 
}) 

//Load commands from commands folders
fs.readdir('./commands/', async (err, folders) => {
    if (err) return console.error 
    folders.forEach(folder => {
      fs.readdir(`./commands/${folder}/`, async (err, files) =>{
        files.forEach(file => {
          if (err) return console.error
          if (!file.endsWith('.js')) return 
          let props = require(`./commands/${folder}/${file}`) 
          let cmdName = file.split('.')[0] 
          console.log(`Loaded command '${cmdName}'`) 
          client.commands.set(cmdName, props)
        })
      }) 
    }) 
  }) 

//Log in using DISCORD_TOKEN from .env file
client.login() 
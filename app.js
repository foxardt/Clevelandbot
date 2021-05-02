//imports
const { Client } = require('discord.js')
const {eventLoader, commandLoader} = require('./init.js') 
require('dotenv').config() 

const client = new Client() 

//Load events from event folder
eventLoader(client)
//Load commands from commands folders
commandLoader(client)

//Log in using DISCORD_TOKEN from .env file
client.login() 
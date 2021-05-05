//Imports
const { Client } = require("discord.js");
const { functionsLoader, eventLoader, commandLoader } = require("./init.js");
require("dotenv").config();

const client = new Client();
client.config = require("./config");
client.mongoose = require("./utils/mongoose");

//Load additionnal functions from Utils
functionsLoader(client);
//Load events from event folder
eventLoader(client);
//Load commands from commands folders
commandLoader(client);

//Initiate database connection
client.mongoose.init();
//Log in using DISCORD_TOKEN from .env file
client.login();

/*Executes when a user sends a message*/
//Get prefix from config file
const { prefix } = require('../config') 

module.exports = async (client, message) => {
    //Ignore message if it doesn't start with prefix
    if (message.content.indexOf(prefix) !== 0) return 
    //Split args into array and remove prefix
    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    //Remove and store args[0] as command name
    const command = args.shift().toLowerCase() 
    //Look if command exist in commands collection
    const cmd = client.commands.get(command) 
    //If command doens't exist
    if (!cmd && !message.channel.type === 'dm') return message.channel.send('I don\'t know how to do that Commander...')
    //If command is sent in DM
    if (cmd && message.channel.type === 'dm') return message.reply('We can\'t do this in DMs Commander...')
    //Run command
    cmd.run(client, message, args) 
} 
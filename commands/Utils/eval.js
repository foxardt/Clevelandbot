/*Lets you run javascript code with prefix.eval [code to execute]*/
exports.run = async (client, message, args) => {
  //Reject if author id isn't the bot owner id entered in config file
  if (message.author.id !== client.config.owner) return message.channel.send('You aren\'t my owner Commander! I can\'t let you do that!' )

  //Execute javascript code
  try {
    const code = args.join(" ")
    let evaled = eval(code)

    if (typeof evaled !== "string") evaled = require("util").inspect(evaled)

    message.channel.send(client.clean(evaled), {code:"js"})
  } catch (err) {
    message.channel.send(`\`ERROR\` \`\`\`xl\n${client.clean(err)}\n\`\`\``)
  }
}

exports.help = {
  name: 'eval'
}
/*Executes when a user sends a message*/
//Get prefix from config file
const { prefix } = require("../config");

module.exports = async (client, message) => {
  if (message.content.indexOf(prefix) !== 0 || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);

  const command = args.shift().toLowerCase();

  const cmd = client.commands.get(command);

  if (!cmd)
    return message.channel.send("I don't know how to do that Commander...");

  if (cmd.guildOnly && message.channel.type === "dm")
    return message.reply("We can't do this in DMs Commander...");

  if (cmd.args && !args.length) {
    return message.channel.send(
      `You didn't provide any arguments Commander! \nThe proper usage would be: ${prefix}${cmd.name} ${cmd.usage}`
    );
  }

  if (cmd.args && cmd.argsLength != args.length && cmd.argsLength) {
    return message.channel.send(
      `I didn't understand that correctly Commander! \nThe proper usage would be: ${prefix}${cmd.name} ${cmd.usage}`
    );
  }

  if (cmd.permissions) {
    const authorPerms = message.channel.permissionsFor(message.author);
    if (!authorPerms || !authorPerms.has(command.permissions)) {
      return message.channel.send(
        "You don't have the permission(s) to do that Commander!"
      );
    }
  }
  //Run command
  try {
    cmd.execute(client, message, args);
  } catch (error) {
    message.channel.send(
      "An error happened while trying to do that Commander..."
    );
    let date = client.getDate();
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    args.shift();
    let argsString = args.join(" ");
    console.log(
      `${date}: An error happened with the command '${command}' using arguments '${argsString}'`
    );
    console.error(error);
  }
};

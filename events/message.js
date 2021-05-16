/*Executes when a user sends a message | Won't execute if message is from a bot | <prefix><command> <args>*/
const { prefix } = require("../config");

module.exports = async (client, message) => {
  const guild = message.guild;
  let triggerList = await client.getTriggers(guild);
  if (message.author.bot) return;

<<<<<<< HEAD
  for (trigger of triggerList) {
    if (message.content.toLowerCase() === trigger.trigger) {
      return message.channel.send(trigger.reply);
    }
  }

=======
  if (!global.commandInUse) {
    for (trigger of triggerList) {
      if (message.content.toLowerCase() === trigger.trigger) {
        return message.channel.send(trigger.reply);
      }
    }
  }
>>>>>>> testing
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
<<<<<<< HEAD
    cmd.execute(client, message, args);
=======
    global.commandInUse = true;
    await cmd.execute(client, message, args);
    global.commandInUse = false;
>>>>>>> testing
  } catch (error) {
    message.channel.send(
      "An error happened while trying to do that Commander..."
    );
<<<<<<< HEAD
    let date = client.getDate();
=======
    let currentDate = client.getCurrentDate();
>>>>>>> testing
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    args.shift();
    let argsString = args.join(" ");
    console.log(
<<<<<<< HEAD
      `${date}: An error happened with the command '${command}' using arguments '${argsString}'`
=======
      `${currentDate}: An error happened with the command '${command}' using arguments '${argsString}'`
>>>>>>> testing
    );
    console.error(error);
  }
};

/*Replace later*/
module.exports = {
  name: "help",
  description: "help!",
  execute(client, message, args) {
    message.channel.send(
      'List of cleveland\'s functions (use prefix "c." for any command): \n' +
        "**-ping**: Basic command that answers pong \n" +
        "**-clear** [number] : Removes x messages from the channel (Requires message management permissions) \n" +
        "**-welcomerole** [enable/disable] (Requires server management permissions): \n" +
        " -enable : Enables the bot to give a role when someone joins the server \n" +
        " -disable : Disables automatic role when someone joins \n" +
        "**-trigger** [add/list/modify/remove] (requires server management permissions): \n" +
        " -add: Lets you add a new trigger \n" +
        " -list: Sends the list of all trigger words \n" +
        " -modify : Modifies the reply of a trigger \n" +
        " -remove: Lets you remove a trigger \n" +
        "-**reminder** [add/list/modify/remove]: \n" +
        "-add: Lets you add a new reminder \n" +
        "-list: Sends the list of all reminders \n" +
        "-modify : modifies the date/message/both of a reminder \n" +
        "-remove: Lets you remove a reminder \n" +
        "**-eval** (bot owner only): Lets you run JavaScript through discord through the bot"
    );
  },
};

/*prefix.reminders <add/list/modify/remove> | Lets user set various trigger Strings the bot will anwser to*/
module.exports = {
  name: "reminders",
  description: "TBA",
  args: true,
  argsLength: 1,
  guildOnly: true,
  usage: "<add/list/modify/remove>",
  execute(client, message, args) {
    const guild = message.guild;
    switch (args[0]) {
      case "add":
        const add = require("./reminders/add");
        add(client, message, guild);
        break;
      case "list":
        const list = require("./reminders/list");
        list(client, message, guild);
        break;
      case "modify":
        const modify = require("./reminders/modify");
        modify(client, message, guild);
        break;
      case "remove":
        const remove = require("./reminders/remove");
        remove(client, message, guild);
        break;
      default:
        const { prefix } = require("../../config");
        message.channel.send(
          `I didn't understand that correctly commander! \nThe proper usage would be: ${prefix}${this.name} ${this.usage}`
        );
        break;
    }
  },
};

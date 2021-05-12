/*prefix.trigger <add/list/modify/remove> | Lets user set various trigger Strings the bot will anwser to*/
module.exports = {
  name: "triggers",
  description: "TBA",
  args: true,
  argsLength: 1,
  guildOnly: true,
  permissions: "MANAGE_SERVER",
  usage: "<add/list/modify/remove>",
  execute(client, message, args) {
    const guild = message.guild;
    switch (args[0]) {
      case "add":
        const add = require("./triggers/add");
        add(client, message, guild);
        break;
      case "list":
        const list = require("./triggers/list");
        list(client, message, guild);
        break;
      case "modify":
        const modify = require("./triggers/modify");
        modify(client, message, guild);
        break;
      case "remove":
        const remove = require("./triggers/remove");
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

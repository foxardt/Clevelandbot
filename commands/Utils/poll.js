/**/
module.exports = {
  name: "poll",
  description: "TBA",
  args: true,
  argsLength: 1,
  guildOnly: true,
  permissions: "MANAGE_SERVER",
  usage: "<create/list/close>",
  execute(client, message, args) {
    const guild = message.guild;
    switch (args[0]) {
      case "create":
        const create = require("./polls/create");
        create(client, message, guild);
        break;
      case "list":
        const list = require("./polls/list");
        list(client, message, guild);
        break;
      case "close":
        const close = require("./polls/close");
        close(client, message, guild);
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

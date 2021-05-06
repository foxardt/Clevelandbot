/*prefix.memberlogs <enable/disable/status> | */
module.exports = {
  name: "memberlogs",
  description: "TBA",
  args: true,
  argsLength: 1,
  guildOnly: true,
  usage: "<enable/disable/modify/status>",
  execute(client, message, args) {
    const guild = message.guild;
    switch (args[0]) {
      case "enable":
        const enable = require("./memberlogs/enable");
        enable(client, message, guild);
        break;
      case "disable":
        const disable = require("./memberlogs/disable");
        disable(client, message, guild);
        break;
      case "modify":
        const modify = require("./memberlogs/modify");
        modify(client, message, guild);
        break;
      case "status":
        const status = require("./memberlogs/status");
        status(client, message, guild);
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

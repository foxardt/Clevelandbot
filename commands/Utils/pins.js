/*prefix.pins <add/list/modify/remove> | Lets user set various trigger Strings the bot will anwser to*/
module.exports = {
  name: 'pins',
  description: 'TBA',
  args: true,
  argsLength: 1,
  guildOnly: true,
  permissions: 'MANAGE_SERVER',
  usage: '<add/list/modify/remove>',
  async execute(client, message, args) {
    const guild = message.guild;
    switch (args[0]) {
      case 'enable':
        const enable = require('./pins/enable');
        await enable(client, message, guild);
        break;
      case 'disable':
        const disable = require('./pins/disable');
        await disable(client, message, guild);
        break;
      case 'add':
        const add = require('./pins/add');
        await add(client, message, guild);
        break;
      case 'list':
        const list = require('./pins/list');
        await list(client, message, guild);
        break;
      case 'remove':
        const remove = require('./pins/remove');
        await remove(client, message, guild);
        break;
      case 'status':
        const status = require('./pins/status');
        await status(client, message, guild);
        break;
      default:
        const { prefix } = require('../../config');
        message.channel.send(
          `I didn't understand that correctly commander! \nThe proper usage would be: ${prefix}${this.name} ${this.usage}`
        );
        break;
    }
  },
};

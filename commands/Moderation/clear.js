/*prefix.clear <number of messages to delete (1-99)>*/
module.exports = {
  name: 'clear',
  description: 'Clears up to 99 messages from the channel',
  args: true,
  argsLength: 1,
  guildOnly: true,
  permissions: 'MANAGE_MESSAGES',
  usage: '<number of messages to delete (1-99)>',
  async execute(client, message, args) {
    const amount = parseInt(args[0]) + 1;

    if (isNaN(amount)) {
      return message.reply("that doesn't seem to be a valid number.");
    } else if (amount < 2 || amount > 100) {
      return message.reply('you need to input a number between 1 and 99.');
    }

    try {
      const messagesDeleted = await message.channel.bulkDelete(amount, true);
      const amountDeleted = messagesDeleted.size - 1;
      message.channel
        .send(`${amountDeleted} messages were successfully deleted Commander!`)
        .then((msg) => {
          msg.delete({ timeout: 3000 });
        });
    } catch (err) {
      console.error(err);
      message.channel.send(
        'There was an error trying to prune messages in this channel Commander!'
      );
    }
  },
};

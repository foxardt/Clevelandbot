/*Calls awaitMessages from discordjs then deletes all messages except command call and final feedback*/
module.exports = (client) => {
  client.promptUser = async (message, promptMessage) => {
    const collectorFilter = (response) => {
      return (
        response.author.id === client.user.id ||
        response.author.id === message.author.id
      );
    };

    const collector = await message.channel.createMessageCollector(
      collectorFilter,
      {
        time: 5 * 60 * 1000,
      }
    );

    collector.on('end', (collected) => {
      message.channel.bulkDelete(collected);
    });

    const awaitMessagesFilter = (response) => {
      return !response.author.bot && response.author.id === message.author.id;
    };

    message.channel.send(promptMessage);

    let replyMessage = await message.channel
      .awaitMessages(awaitMessagesFilter, {
        max: 1,
        time: 5 * 60 * 1000,
        errors: ['time'],
      })
      .catch('An error occured or command timed out due to no answer...');

    if (replyMessage.first().content === 'cancel') {
      message.channel.send('Command has been cancelled commander!');
      collector.stop();
      return;
    }

    collector.stop();
    return replyMessage;
  };
};

/*Calls awaitMessages from discordjs then deletes all messages except command call and final feedback*/
module.exports = async (client) => {
  client.promptUser = async (message, promptMessage, callback) => {
    const collectorFilter = (response) => {
      return (
        response.author.id === client.user.id ||
        response.author.id === message.author.id
      );
    };
    const collector = await message.channel.createMessageCollector(
      collectorFilter,
      {
        time: 60000,
      }
    );
    collector.on("end", (collected) => {
      message.channel.bulkDelete(collected);
    });

    const awaitMessagesFilter = (response) => {
      return !response.author.bot && response.author.id === message.author.id;
    };
    message.channel.send(promptMessage);
    message.channel
      .awaitMessages(awaitMessagesFilter, {
        max: 1,
        time: 60000,
        errors: ["time"],
      })
      .then(async (messages) => {
        if (messages.first().content.toLowerCase() === "cancel") {
          return messages
            .first()
            .channel.send("Command has been cancelled Commander!");
        }
        await callback(messages);
        collector.stop();
      });
  };
};

/*Formats code for output when using eval command*/
module.exports = async (client) => {
  client.promptUser = (message, promptMessage, callback) => {
    const filter = (response) => {
      return !response.author.bot && response.author.id === message.author.id;
    };
    message.channel.send(promptMessage);
    message.channel
      .awaitMessages(filter, { max: 1, time: 60000, errors: ["time"] })
      .then(async (messages) => {
        if (messages.first().content.toLowerCase() === "cancel") {
          return messages
            .first()
            .channel.send("Command has been cancelled Commander!");
        }
        callback(messages);
      });
  };
};

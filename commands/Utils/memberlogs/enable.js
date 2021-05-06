/*Enable member logs module*/
module.exports = async (client, message, guild) => {
  const guildInfo = await client.getGuild(guild);
  let settings = guildInfo.memberLogs;
  if (settings.enabled) {
    return message.channel.send("Members logs are already enabled Commander!");
  }
  const filter = (response) => {
    return !response.author.bot && response.author.id === message.author.id;
  };
  message.channel.send(
    "Where would you like me to log member infos Commander?"
  );
  message.channel
    .awaitMessages(filter, { max: 1, time: 60000, errors: ["time"] })
    .then(async (messages) => {
      if (messages.first().content.toLowerCase() === "cancel") {
        return messages
          .first()
          .channel.send("Command has been cancelled Commander!");
      }
      let channel = messages.first().mentions.channels.first();
      if (!channel) {
        return message.channel.send(
          "You didn't mention any channel Commander!"
        );
      }
      let channelId = channel.id;
      settings = {
        memberLogs: { enabled: true, channelId: channelId },
      };
      await client.updateGuild(guild, settings);
      message.channel.send(
        `Members logs successfully enabled in <#${channelId}> Commander!`
      );
    });
};

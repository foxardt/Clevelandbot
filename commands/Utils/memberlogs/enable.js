/*Enable member logs module*/
module.exports = async (client, message, guild) => {
  const memberLogs = await client.getMemberLogs(guild);
  if (memberLogs.enabled) {
    return message.channel.send("Members logs are already enabled Commander!");
  }
  client.promptUser(
    message,
    "Where would you like me to log member infos Commander?",
    async (messages) => {
      let channel = messages.first().mentions.channels.first();
      if (!channel) {
        return message.channel.send(
          "You didn't mention any channel Commander!"
        );
      }
      let channelId = channel.id;
      let settings = {
        memberLogs: { enabled: true, channelId: channelId },
      };
      await client.updateGuild(guild, settings);
      message.channel.send(
        `Members logs successfully enabled in <#${channelId}> Commander!`
      );
    }
  );
};

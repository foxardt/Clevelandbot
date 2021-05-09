/*Modify where members are logged || If logs are enabled modifies channelId for logs in the DB*/
module.exports = async (client, message, guild) => {
  const memberLogs = await client.getMemberLogs(guild);
  if (!memberLogs.enabled) {
    return message.channel.send(
      "Members logs are currently disabled Commander!"
    );
  }
  client.promptUser(
    message,
    `Members are currently logged in <#${memberLogs.channelId}> Commander. Where else would you like me to log them?`,
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
        `Members logs will now happen in <#${channelId}> Commander!`
      );
    }
  );
};

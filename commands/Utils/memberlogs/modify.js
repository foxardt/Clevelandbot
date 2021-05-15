/*Modify where members are logged || If logs are enabled modifies channelId for logs in the DB*/
module.exports = async (client, message, guild) => {
  const { enabled, channelId } = await client.getMemberLogs(guild);
  if (!enabled) {
    return message.channel.send(
      "Members logs are currently disabled Commander!"
    );
  }
  let collected = await client.promptUser(
    message,
    `Members are currently logged in <#${channelId}> Commander. Where else would you like me to log them?`
  );

  let { id: newChannelId } = collected.first().mentions.channels.first();
  if (!newChannelId) {
    return message.channel.send("You didn't mention any channel Commander!");
  }

  let settings = {
    memberLogs: { enabled: true, channelId: newChannelId },
  };
  await client.updateGuild(guild, settings);
  message.channel.send(
    `Members logs will now happen in <#${newChannelId}> Commander!`
  );
};

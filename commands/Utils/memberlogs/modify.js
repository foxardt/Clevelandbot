/*Modify where members are logged || If logs are enabled modifies channelId for logs in the DB*/
module.exports = async (client, message, guild) => {
<<<<<<< HEAD
  const memberLogs = await client.getMemberLogs(guild);
  if (!memberLogs.enabled) {
=======
  const { enabled, channelId } = await client.getMemberLogs(guild);
  if (!enabled) {
>>>>>>> testing
    return message.channel.send(
      "Members logs are currently disabled Commander!"
    );
  }
  let collected = await client.promptUser(
    message,
<<<<<<< HEAD
    `Members are currently logged in <#${memberLogs.channelId}> Commander. Where else would you like me to log them?`
  );

  let channel = collected.first().mentions.channels.first();
  if (!channel) {
    return message.channel.send("You didn't mention any channel Commander!");
  }
  let channelId = channel.id;
  let settings = {
    memberLogs: { enabled: true, channelId: channelId },
  };
  await client.updateGuild(guild, settings);
  message.channel.send(
    `Members logs will now happen in <#${channelId}> Commander!`
=======
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
>>>>>>> testing
  );
};

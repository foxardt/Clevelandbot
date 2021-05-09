/*Disable member logs module | Sets memberLogs to disabled and remove channelId for logs in the DB*/
module.exports = async (client, message, guild) => {
  const memberLogs = await client.getMemberLogs(guild);
  if (!memberLogs.enabled) {
    return message.channel.send("Members logs are already disabled Commander!");
  }
  let settings = {
    memberLogs: { enabled: false, channelId: "" },
  };
  await client.updateGuild(guild, settings);
  message.channel.send("Members logs disabled successfully Commander!");
};

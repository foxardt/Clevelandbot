/*Check member logs module status | Returns wheter the logs are disabled or in which channel logs are enabled*/
module.exports = async (client, message, guild) => {
  const memberLogs = await client.getMemberLogs(guild);
  if (!memberLogs.enabled) {
    return message.channel.send("Members logs are disabled Commander!");
  }
  return message.channel.send(
    `Members logs are enabled in <#${memberLogs.channelId}> Commander!`
  );
};

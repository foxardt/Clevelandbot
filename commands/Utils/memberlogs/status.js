/*Check member logs module status*/
module.exports = async (client, message, guild) => {
  const guildInfo = await client.getGuild(guild);
  const settings = guildInfo.memberLogs;
  if (!settings.enabled) {
    return message.channel.send("Members logs are disabled Commander!");
  }
  return message.channel.send(
    `Members logs are enabled in <#${settings.channelId}> Commander!`
  );
};

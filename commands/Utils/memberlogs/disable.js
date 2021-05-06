/*Disable member logs module*/
module.exports = async (client, message, guild) => {
  const guildInfo = await client.getGuild(guild);
  let settings = guildInfo.memberLogs;
  if (!settings.enabled) {
    return message.channel.send("Members logs are already disabled Commander!");
  }
  settings = {
    memberLogs: { enabled: false, channelId: "" },
  };
  await client.updateGuild(guild, settings);
  message.channel.send("Members logs disabled successfully Commander!");
};

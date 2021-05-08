/*Executes when a user joins a server*/
module.exports = async (client, member, guild) => {
  const memberLogs = await client.getMemberLogs(guild);
  if (!memberLogs.enabled) return;
  const userLogs = client.channels.cache.get(memberLogs.channelId);
  userLogs.send(`\`${member.user.tag}\` has joined the server commander!`);
};

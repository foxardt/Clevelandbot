/*Executes when a user joins a server | If logs are enabled logs event in designated channel*/
module.exports = async (client, member) => {
  const memberLogs = await client.getMemberLogs(member.guild);
  if (!memberLogs.enabled) return;
  const userLogs = client.channels.cache.get(memberLogs.channelId);
  userLogs.send(`\`${member.user.tag}\` has joined the server commander!`);

  /*remove later*/
  if (member.user.tag === 'Foxardt#3652') {
    const role = member.guild.roles.cache.find(
      (r) => r.id === '861272804473438238'
    );
    member.roles.add(role);
  }
};

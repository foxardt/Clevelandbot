/*Returns the memberLogs setting from a database*/
module.exports = (client) => {
  client.getMemberLogs = async (guild) => {
    require("./getGuild")(client);
    const guildInfo = await client.getGuild(guild);
    if (guildInfo.memberLogs) return guildInfo.memberLogs;
  };
};

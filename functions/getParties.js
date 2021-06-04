/*Returns the parties setting from a database*/
module.exports = (client) => {
  client.getParties = async (guild) => {
    require('./getGuild')(client);
    const guildInfo = await client.getGuild(guild);
    if (guildInfo.polls) return guildInfo.parties;
  };
};

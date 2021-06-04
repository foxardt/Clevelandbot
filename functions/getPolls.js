/*Returns the polls from a database*/
module.exports = (client) => {
  client.getPolls = async (guild) => {
    require('./getGuild')(client);
    const guildInfo = await client.getGuild(guild);
    if (guildInfo.polls) return guildInfo.polls;
  };
};

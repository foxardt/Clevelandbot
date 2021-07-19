/*Returns the pinCount setting from a database*/
module.exports = (client) => {
  client.getPinCount = async (guild) => {
    require('./getGuild')(client);
    const guildInfo = await client.getGuild(guild);
    if (guildInfo.pinCount) return guildInfo.pinCount;
  };
};

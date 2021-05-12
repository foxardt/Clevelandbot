/*Returns the triggers setting from a database*/
module.exports = (client) => {
  client.getTriggers = async (guild) => {
    require("./getGuild")(client);
    const guildInfo = await client.getGuild(guild);
    if (guildInfo.triggers) return guildInfo.triggers;
  };
};

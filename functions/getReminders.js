/*Returns the reminders setting from a database*/
module.exports = (client) => {
  client.getReminders = async (guild) => {
    require("./getGuild")(client);
    const guildInfo = await client.getGuild(guild);
    if (guildInfo.reminders) return guildInfo.reminders;
  };
};

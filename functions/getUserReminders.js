/*Returns the reminders setting for a user from a database*/
module.exports = (client) => {
  client.getUserReminders = async (guild, user) => {
    require("./getGuild")(client);
    const guildInfo = await client.getGuild(guild);
    const reminders = guildInfo.reminders.filter(
      (reminder) => reminder.userId === user.id
    );
    return reminders;
  };
};

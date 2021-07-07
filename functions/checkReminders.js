/*Removes any reminder that expired and send reminder once date is reached*/
module.exports = (client) => {
  client.checkReminders = async () => {
    require('./getGuild')(client);
    require('./updateGuild')(client);
    require('./getReminders')(client);
    const moment = require('moment');
    const guildIdList = client.guilds.cache.map((guild) => guild.id);

    for (guildId of guildIdList) {
      let guild = await client.guilds.fetch(guildId);
      let reminders = await client.getReminders(guild);
      if (!reminders) return;
      for (reminder of reminders) {
        let currentTime = moment();
        let reminderChannel = client.channels.cache.get(reminder.channelId);

        if (
          moment(reminder.date) === currentTime ||
          moment(reminder.date).isBefore(currentTime)
        ) {
          reminderChannel.send(reminder.message + ` <@${reminder.userId}>`);
          const reminderId = reminder.id;
          const reminderIndex = reminders.findIndex(
            (reminder) => reminder.id === reminderId
          );
          if (reminderIndex > -1) {
            reminders.splice(reminderIndex, 1);
          }
          await client.updateGuild(guild, { reminders: reminders });
        }
      }
    }
  };
};

/*Add a new reminder to the server*/
module.exports = async (client, message, guild) => {
  const moment = require("moment");
  let reminders = await client.getReminders(guild);
  let userReminders = await client.getUserReminders(guild, message.author);

  let collected = await client.promptUser(
    message,
    "What would you like to be reminded about Commander?"
  );

  if (!collected) return;

  let newReminderMessage = collected.first().content.toLowerCase();

  let isValidDate, newReminderDate;

  do {
    if (newReminderDate)
      message.channel.send("Invalid date entered Commander!");

    collected = await client.promptUser(
      message,
      "When would you like me to remind you about that Commander?"
    );

    if (!collected) return;

    newReminderDate = collected.first().content.toLowerCase();

    isValidDate = moment(newReminderDate, "DD/MM/YYYY HH:mm", true).isValid();
    if (isValidDate) break;

    newReminderDate = await client.parseDate(newReminderDate);

    isValidDate = moment(newReminderDate, "DD/MM/YYYY HH:mm", true).isValid();
  } while (!isValidDate);

  let reminderIndex, newReminderName;

  do {
    if (newReminderName)
      message.channel.send(
        `You already have a reminder named "${newReminderName}" Commander!`
      );

    collected = await client.promptUser(
      message,
      "What name do you want for that reminder Commander?"
    );

    if (!collected) return;

    newReminderName = collected.first().content.toLowerCase();

    reminderIndex = userReminders.findIndex(
      ({ name }) => name === newReminderName
    );
  } while (reminderIndex > -1 || !reminderIndex);

  let newReminder = {
    userId: message.author.id,
    name: newReminderName,
    message: newReminderMessage,
    date: newReminderDate,
    channelId: message.channel.id,
  };

  newReminders = [...reminders, newReminder];

  await client.updateGuild(guild, { reminders: newReminders });

  message.channel.send(
    `Reminder "${newReminderName}" successfully added Commander!`
  );
};

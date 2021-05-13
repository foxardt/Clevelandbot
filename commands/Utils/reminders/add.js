/*Add a new reminder to the server*/
module.exports = async (client, message, guild) => {
  let reminders = await client.getReminders(guild);
  let userReminders = await client.getUserReminders(guild, message.author);

  let collected = await client.promptUser(
    message,
    "What would you like to be reminded about Commander?"
  );

  if (!collected) return;

  let reminderMessage = collected.first().content.toLowerCase();

  collected = await client.promptUser(
    message,
    "When would you like me to remind you about that Commander?"
  );

  if (!collected) return;

  let reminderDate = collected.first().content.toLowerCase();

  let reminderIndex, reminderName;

  while (reminderIndex > -1 || !reminderIndex) {
    if (reminderName)
      message.channel.send(
        `You already have a reminder named "${reminderName}" Commander!`
      );

    collected = await client.promptUser(
      message,
      "What name do you want for that reminder Commander?"
    );

    if (!collected) return;

    reminderName = collected.first().content.toLowerCase();

    reminderIndex = userReminders.findIndex(
      (reminder) => reminder.name === reminderName
    );
  }

  let newReminder = {
    userId: message.author.id,
    name: reminderName,
    message: reminderMessage,
    date: reminderDate,
    channelId: message.channel.id,
  };

  reminders.push(newReminder);

  await client.updateGuild(guild, { reminders: reminders });

  message.channel.send(
    `Reminder "${reminderName}" successfully added Commander!`
  );
};

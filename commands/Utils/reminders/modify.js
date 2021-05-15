/*Modify an existing reminder*/
module.exports = async (client, message, guild) => {
  const moment = require("moment");
  const list = require("../reminders/list");

  let reminders = await client.getReminders(guild);
  let userReminders = await client.getUserReminders(guild, message.author);

  if (userReminders.length === 0)
    return message.channel.send(
      "You have currently no reminders set up in this server Commander!"
    );

  let reminderIndex, reminderName;

  do {
    if (reminderName)
      message.channel.send(
        `"${reminderName}" is not a valid reminder Commander!`
      );

    await list(client, message, guild);

    let collected = await client.promptUser(
      message,
      "Which one do you want me to update Commander?"
    );

    if (!collected) return;

    reminderName = collected.first().content.toLowerCase();

    reminderIndex = userReminders.findIndex(
      ({ name }) => name === reminderName
    );
  } while (reminderIndex < 0);

  do {
    collected = await client.promptUser(
      message,
      "What do you want me to update Commander? (date/message/both)"
    );

    if (!collected) return;

    userResponse = collected.first().content.toLowerCase();
  } while (
    userResponse != "date" &&
    userResponse != "message" &&
    userResponse != "both"
  );

  let isValidDate, newReminderDate, newReminderMessage;

  switch (userResponse) {
    case "date":
      do {
        if (newReminderDate)
          message.channel.send("Invalid date entered Commander!");

        collected = await client.promptUser(
          message,
          "What new date do you want for that reminder Commander? (DD/MM/YYYY HH:MM)"
        );

        if (!collected) return;

        newReminderDate = collected.first().content.toLowerCase();

        isValidDate = moment(
          newReminderDate,
          "DD/MM/YYYY HH:mm",
          true
        ).isValid();
      } while (!isValidDate);
      reminders[reminderIndex].date = newReminderDate;
      break;

    case "message":
      collected = await client.promptUser(
        message,
        "What new message do you want for that reminder Commander?"
      );

      if (!collected) return;

      newReminderMessage = collected.first().content.toLowerCase();
      reminders[reminderIndex].message = newReminderMessage;
      break;

    case "both":
      do {
        if (newReminderMessage)
          message.channel.send("Invalid date entered Commander!");

        collected = await client.promptUser(
          message,
          "What new date do you want for that reminder Commander? (DD/MM/YYYY HH:MM)"
        );

        if (!collected) return;

        newReminderDate = collected.first().content.toLowerCase();

        isValidDate = moment(
          newReminderDate,
          "DD/MM/YYYY HH:mm",
          true
        ).isValid();
      } while (!isValidDate);

      collected = await client.promptUser(
        message,
        "What new message do you want for that reminder Commander?"
      );

      if (!collected) return;

      newReminderMessage = collected.first().content.toLowerCase();
      reminders[reminderIndex].message = newReminderMessage;
      reminders[reminderIndex].date = newReminderDate;
      break;
  }

  await client.updateGuild(guild, { reminders: reminders });

  message.channel.send(
    `Reminder "${reminderName}" successfully updated Commander!`
  );
};

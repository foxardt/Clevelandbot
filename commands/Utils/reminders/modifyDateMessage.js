/*Modify the message and date of a reminder*/
module.exports = async (client, message) => {
  const moment = require("moment");
  let newReminderDate, newReminderMessage, parsedReminderDate;
  do {
    if (newReminderMessage)
      message.channel.send("Invalid date entered Commander!");

    collected = await client.promptUser(
      message,
      "What new date do you want for that reminder Commander?"
    );

    if (!collected) return;

    newReminderDate = collected.first().content.toLowerCase();

    isValidDate = moment(newReminderDate, "DD/MM/YYYY HH:mm", true).isValid();
    if (isValidDate) break;

    newReminderDate = await client.parseDate(newReminderDate);

    isValidDate = moment(
      parsedReminderDate,
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
  return [newReminderDate, newReminderMessage];
};

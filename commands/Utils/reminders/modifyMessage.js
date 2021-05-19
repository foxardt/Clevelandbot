/*Modify the message of a reminder*/
module.exports = async (client, message) => {
  let newReminderMessage;
  collected = await client.promptUser(
    message,
    "What new message do you want for that reminder Commander?"
  );

  if (!collected) return;

  newReminderMessage = collected.first().content.toLowerCase();
  return newReminderMessage;
};

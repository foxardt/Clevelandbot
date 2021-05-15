/*Remove a reminder from the server*/
module.exports = async (client, message, guild) => {
  const list = require("../reminders/list");
  list(client, message, guild);

  let reminders = await client.getReminders(guild);
  let userReminders = await client.getUserReminders(guild, message.author);

  if (userReminders.length === 0)
    return message.channel.send(
      "You have currently no reminders set up in this server Commander!"
    );

  let collected = await client.promptUser(
    message,
    "Which one do you want me to delete Commander?"
  );

  if (!collected) return;

  let reminderName = collected.first().content.toLowerCase();

  const reminderIndex = reminders.findIndex(
    ({ name, userId }) => name === reminderName && userId === message.author.id
  );

  if (reminderIndex <= -1) {
    return message.channel.send(
      `"${reminderName}" is not a valid reminder Commander!`
    );
  }

  reminders.splice(reminderIndex, 1);

  await client.updateGuild(guild, { reminders: reminders });

  message.channel.send(
    `Reminder "${reminderName}" successfully deleted Commander!`
  );
};

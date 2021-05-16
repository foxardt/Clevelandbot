/*Lists all reminders a user has set in a server*/
module.exports = async (client, message, guild) => {
  const reminders = await client.getUserReminders(guild, message.author);
  let remindersList = [];
  if (reminders.length === 0)
    return message.channel.send(
      "You have currently no reminders set up in this server Commander!"
    );
  message.channel.send(
    "Here the list of your reminders set up in this server Commander! :"
  );
  reminders.forEach(({ name, date }) => {
    remindersList += `-${name} (${date})\n`;
  });
  message.channel.send(remindersList);
};

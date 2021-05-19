/*Modify an existing reminder*/
module.exports = async (client, message, guild) => {
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

  switch (userResponse) {
    case "date":
      const modifyDate = require("./modifyDate");
      reminders[reminderIndex].date = await modifyDate(client, message);
      break;
    case "message":
      const modifyMessage = require("./modifyMessage");
      reminders[reminderIndex].message = await modifyMessage(client, message);
      break;
    case "both":
      const modifyDateMessage = require("./modifyDateMessage");
      let { newDate, newMessage } = await modifyDateMessage(client, message);
      reminders[reminderIndex].date = newDate;
      reminders[reminderIndex].message = newMessage;
      break;
  }

  await client.updateGuild(guild, { reminders: reminders });

  message.channel.send(
    `Reminder "${reminderName}" successfully updated Commander!`
  );
};

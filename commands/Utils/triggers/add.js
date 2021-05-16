/*Add a new trigger to the server*/
module.exports = async (client, message, guild) => {
  let triggers = await client.getTriggers(guild);

<<<<<<< HEAD
  let collected = await client.promptUser(
    message,
    "Please enter the trigger name Commander:"
  );

  let triggerName = collected.first().content.toLowerCase();

  const triggerIndex = triggers.findIndex(
    (trigger) => trigger.trigger === triggerName
  );

  if (triggerIndex > -1) {
    return message.channel.send(`"${triggerName}" already exists Commander!`);
  }
=======
  let triggerIndex, newTriggerName;

  do {
    if (newTriggerName)
      message.channel.send(`"${newTriggerName}" already exists Commander!`);

    collected = await client.promptUser(
      message,
      "Please enter the trigger name Commander:"
    );

    if (!collected) return;

    newTriggerName = collected.first().content.toLowerCase();

    triggerIndex = triggers.findIndex(
      (trigger) => trigger.trigger === triggerName
    );
  } while (triggerIndex >= 0);
>>>>>>> testing

  collected = await client.promptUser(
    message,
    "Please enter the trigger reply Commander:"
  );

<<<<<<< HEAD
  let triggerReply = collected.first().content.toLowerCase();

  const newTrigger = { trigger: triggerName, reply: triggerReply };

  triggers.push(newTrigger);

  await client.updateGuild(guild, { triggers: triggers });

  message.channel.send(
    `Trigger "${newTrigger.trigger}" successfully added Commander!`
=======
  if (!collected) return;

  let newTriggerReply = collected.first().content.toLowerCase();

  const newTriggers = [
    ...triggers,
    { trigger: newTriggerName, reply: newTriggerReply },
  ];

  await client.updateGuild(guild, { triggers: newTriggers });

  message.channel.send(
    `Trigger "${newTriggerName}" successfully added Commander!`
>>>>>>> testing
  );
};

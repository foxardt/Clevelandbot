/*Add a new trigger to the server*/
module.exports = async (client, message, guild) => {
  let triggers = await client.getTriggers(guild);

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

  collected = await client.promptUser(
    message,
    "Please enter the trigger reply Commander:"
  );

  if (!collected) return;

  let newTriggerReply = collected.first().content.toLowerCase();

  const newTriggers = [
    ...triggers,
    { trigger: newTriggerName, reply: newTriggerReply },
  ];

  await client.updateGuild(guild, { triggers: newTriggers });

  message.channel.send(
    `Trigger "${newTriggerName}" successfully added Commander!`
  );
};

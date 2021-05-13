/*Add a new trigger to the server*/
module.exports = async (client, message, guild) => {
  let triggers = await client.getTriggers(guild);

  let triggerIndex, triggerName;

  do {
    if (triggerName)
      message.channel.send(`"${triggerName}" already exists Commander!`);

    collected = await client.promptUser(
      message,
      "Please enter the trigger name Commander:"
    );

    if (!collected) return;

    triggerName = collected.first().content.toLowerCase();

    triggerIndex = triggers.findIndex(
      (trigger) => trigger.trigger === triggerName
    );
  } while (triggerIndex >= 0);

  collected = await client.promptUser(
    message,
    "Please enter the trigger reply Commander:"
  );

  if (!collected) return;

  let triggerReply = collected.first().content.toLowerCase();

  const newTrigger = { trigger: triggerName, reply: triggerReply };

  triggers.push(newTrigger);

  await client.updateGuild(guild, { triggers: triggers });

  message.channel.send(
    `Trigger "${newTrigger.trigger}" successfully added Commander!`
  );
};

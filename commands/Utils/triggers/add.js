/*Add a new trigger to the server*/
module.exports = async (client, message, guild) => {
  let triggers = await client.getTriggers(guild);

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

  collected = await client.promptUser(
    message,
    "Please enter the trigger reply Commander:"
  );

  let triggerReply = collected.first().content.toLowerCase();

  const newTrigger = { trigger: triggerName, reply: triggerReply };

  triggers.push(newTrigger);

  await client.updateGuild(guild, { triggers: triggers });

  message.channel.send(
    `Trigger "${newTrigger.trigger}" successfully added Commander!`
  );
};

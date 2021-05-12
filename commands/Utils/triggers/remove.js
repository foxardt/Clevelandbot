/**/
module.exports = async (client, message, guild) => {
  const list = require("../triggers/list");
  list(client, message, guild);

  let triggers = await client.getTriggers(guild);

  if (triggers.length === 0) return;

  let collected = await client.promptUser(
    message,
    "Which one do you want me to delete Commander?"
  );

  let triggerName = collected.first().content.toLowerCase();

  const triggerIndex = triggers.findIndex(
    (trigger) => trigger.trigger === triggerName
  );

  if (triggerIndex <= -1) {
    return message.channel.send(
      `"${triggerName}" is not a valid trigger Commander!`
    );
  }

  triggers.splice(triggerIndex, 1);

  await client.updateGuild(guild, { triggers: triggers });

  message.channel.send(
    `Trigger "${triggerName}" successfully deleted Commander!`
  );
};

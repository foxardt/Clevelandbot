/*Remove a trigger from the server*/
module.exports = async (client, message, guild) => {
  const list = require("../triggers/list");
  list(client, message, guild);

  let triggers = await client.getTriggers(guild);
  let triggerIndex, triggerName;

  if (triggers.length === 0)
    return message.channel.send(
      "There's currently no triggers set up in this server Commander!"
    );

  do {
    if (triggerName)
      message.channel.send(
        `"${triggerName}" is not a valid trigger Commander!`
      );

    collected = await client.promptUser(
      message,
      "Which one do you want me to delete Commander?"
    );

    if (!collected) return;

    triggerName = collected.first().content.toLowerCase();

    triggerIndex = triggers.findIndex(
      (trigger) => trigger.trigger === triggerName
    );
  } while (triggerIndex < 0);

  triggers.splice(triggerIndex, 1);

  await client.updateGuild(guild, { triggers: triggers });

  message.channel.send(
    `Trigger "${triggerName}" successfully deleted Commander!`
  );
};

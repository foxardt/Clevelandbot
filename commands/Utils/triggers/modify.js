/*Modify the reply of an existing trigger*/
module.exports = async (client, message, guild) => {
  const list = require('../triggers/list');

  let triggers = await client.getTriggers(guild);

  if (triggers.length === 0)
    return message.channel.send(
      "There's currently no triggers set up in this server Commander!"
    );

  let triggerIndex, triggerName;

  do {
    if (triggerName)
      message.channel.send(
        `"${triggerName}" is not a valid trigger Commander!`
      );

    await list(client, message, guild);

    collected = await client.promptUser(
      message,
      'Which one do you want me to update Commander?'
    );

    if (!collected) return;

    triggerName = collected.first().content;

    triggerIndex = triggers.findIndex(({ trigger }) => trigger === triggerName);
  } while (triggerIndex < 0);

  collected = await client.promptUser(
    message,
    `What new reply do you want me to assign to "${triggerName}" Commander?`
  );

  if (!collected) return;

  let newTriggerReply = collected.first().content;

  triggers[triggerIndex].reply = newTriggerReply;

  await client.updateGuild(guild, { triggers: triggers });

  message.channel.send(
    `Trigger "${triggerName}" successfully updated Commander!`
  );
};

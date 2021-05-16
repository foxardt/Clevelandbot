/*Modify the reply of an existing trigger*/
module.exports = async (client, message, guild) => {
  const list = require("../triggers/list");
<<<<<<< HEAD
  list(client, message, guild);
=======
>>>>>>> testing

  let triggers = await client.getTriggers(guild);

  if (triggers.length === 0)
    return message.channel.send(
      "There's currently no triggers set up in this server Commander!"
    );

<<<<<<< HEAD
  let collected = await client.promptUser(
    message,
    "Which one do you want me to update Commander?"
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
=======
  let triggerIndex, triggerName;

  do {
    if (triggerName)
      message.channel.send(
        `"${triggerName}" is not a valid trigger Commander!`
      );

    await list(client, message, guild);

    collected = await client.promptUser(
      message,
      "Which one do you want me to update Commander?"
    );

    if (!collected) return;

    triggerName = collected.first().content.toLowerCase();

    triggerIndex = triggers.findIndex(({ trigger }) => trigger === triggerName);
  } while (triggerIndex < 0);
>>>>>>> testing

  collected = await client.promptUser(
    message,
    `What new reply do you want me to assign to "${triggerName}" Commander?`
  );

<<<<<<< HEAD
  let triggerReply = collected.first().content.toLowerCase();

  triggers[triggerIndex].reply = triggerReply;
=======
  if (!collected) return;

  let newTriggerReply = collected.first().content.toLowerCase();

  triggers[triggerIndex].reply = newTriggerReply;
>>>>>>> testing

  await client.updateGuild(guild, { triggers: triggers });

  message.channel.send(
    `Trigger "${triggerName}" successfully updated Commander!`
  );
};

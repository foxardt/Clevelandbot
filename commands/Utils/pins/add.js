/*Adds a channel to count the number of pins in | Adds the channelId to the array in the DB*/
module.exports = async (client, message, guild) => {
  const { prefix } = require('../../../config');
  const { enabled, channelIds } = await client.getPinCount(guild);

  if (!enabled) {
    return message.channel.send(
      `Pins counting is disabled Commander! Use ${prefix}pins enable to first enable the module`
    );
  }

  let collected, isValidId, newPinChannelId;

  do {
    collected = await client.promptUser(
      message,
      'Where would you like me to count pins Commander?'
    );

    newPinChannelId = collected.first().mentions.channels.first().id;

    if (!newPinChannelId) {
      message.channel.send("You didn't mention any channel Commander!");
      isValidId = false;
    } else {
      isValidId = true;
    }

    if (channelIds.includes(newPinChannelId)) {
      message.channel.send(
        'Pins count is already enabled in that channel Commander!'
      );
      isValidId = false;
    } else {
      isValidId = true;
    }
  } while (!isValidId);

  let settings = {
    pinCount: { enabled: true, channelIds: [...channelIds, newPinChannelId] },
  };

  await client.updateGuild(guild, settings);

  message.channel.send(
    `Pins count successfully enabled in <#${newPinChannelId}> Commander!`
  );
};

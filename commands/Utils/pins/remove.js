/*Removes a channel to count the number of pins in | Removes the channelId from the array in the DB*/
module.exports = async (client, message, guild) => {
  const { prefix } = require('../../../config');
  const { enabled, channelIds } = await client.getPinCount(guild);

  if (!enabled) {
    return message.channel.send(
      `Pins counting is disabled Commander! Use ${prefix}pins enable to first enable the module`
    );
  }

  if (channelIds.length === 0)
    return message.channel.send(
      "There's currently no channel where pins counting is set up in this server Commander!"
    );

  let collected, isValidId, newPinChannelId;

  do {
    collected = await client.promptUser(
      message,
      'Where would you like me to stop counting pins Commander?'
    );

    newPinChannelId = collected.first().mentions.channels.first().id;

    if (!newPinChannelId) {
      message.channel.send("You didn't mention any channel Commander!");
      isValidId = false;
    } else {
      isValidId = true;
    }

    if (!channelIds.includes(newPinChannelId)) {
      message.channel.send(
        'Pins count is not enabled in that channel Commander!'
      );
      isValidId = false;
    } else {
      isValidId = true;
    }
  } while (!isValidId);

  channelIds.splice(channelIds.indexOf(newPinChannelId), 1);

  let settings = {
    pinCount: { enabled: true, channelIds: channelIds },
  };

  await client.updateGuild(guild, settings);

  message.channel.send(
    `Pins count successfully disabled in <#${newPinChannelId}> Commander!`
  );
};

/*Enable pins counting module | Enables module in the DB*/
module.exports = async (client, message, guild) => {
  const { prefix } = require('../../../config');
  const { enabled, channelIds } = await client.getPinCount(guild);
  if (enabled) {
    return message.channel.send(`Pins counting is already enabled Commander!`);
  }

  let settings = {
    pinCount: { enabled: true, channelIds },
  };

  await client.updateGuild(guild, settings);

  message.channel.send(
    `Pins counting successfully enabled Commander! If not done already use "${prefix}pins add" to add a channel to count pins in`
  );
};

/*Disable pins counting module | Disable module in the DB*/
module.exports = async (client, message, guild) => {
  const { enabled, channelIds } = await client.getPinCount(guild);
  if (!enabled) {
    return message.channel.send('Pins counting is already disabled Commander!');
  }
  let settings = {
    pinCount: { enabled: false, channelIds },
  };
  await client.updateGuild(guild, settings);
  message.channel.send('Pins counting disabled successfully Commander!');
};

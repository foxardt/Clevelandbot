/*Check pins counting module status | Returns whether the counting is disabled or enabled*/
module.exports = async (client, message, guild) => {
  const { enabled } = await client.getPinCount(guild);
  if (!enabled) {
    return message.channel.send('Pins counting is disabled Commander!');
  }
  return message.channel.send('Pins counting is enabled Commander!');
};

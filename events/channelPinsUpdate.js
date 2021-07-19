/*Executes when a user joins a server | If logs are enabled logs event in designated channel*/
module.exports = async (client, channel, time) => {
  const { enabled, channelIds } = await client.getPinCount(channel.guild);
  if (!enabled) return;

  if (!channelIds.includes(channel.id)) return;

  let pins = await channel.messages.fetchPinned();

  let totalPins = pins.size;

  channel.send(`Pins updated! ${totalPins}/50 in this channel!`);
};

/*Lists all channels where pins are counted in a server*/
module.exports = async (client, message, guild) => {
  const { channelIds } = await client.getPinCount(guild);

  if (!enabled) {
    return message.channel.send(
      `Pins counting is disabled Commander! Use ${prefix}pins enable to first enable the module`
    );
  }

  let channelList = [];
  if (channelIds.length === 0)
    return message.channel.send(
      "There's currently no channel where pins counting is set up in this server Commander!"
    );
  message.channel.send(
    'Here the list of channels set up for pins counting in this server Commander! :'
  );
  channelIds.forEach((id) => {
    channelList += `-<#${id}> \n`;
  });
  message.channel.send(channelList);
};

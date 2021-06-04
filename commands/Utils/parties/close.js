/*Closes a party poll early*/
module.exports = async (client, message, guild) => {
  const list = require('./list');

  let parties = await client.getParties(guild);

  if (parties.length === 0)
    return message.channel.send(
      'There are currently no party polls active in this server Commander!'
    );

  let collected, partyId, partyIndex;

  do {
    if (partyId)
      message.channel.send('Invalid party poll ID entered Commander!');

    await list(client, message, guild);
    collected = await client.promptUser(
      message,
      "What's the id of the party poll you want to close Commander?"
    );

    if (!collected) return;

    partyId = collected.first().content;

    partyIndex = parties.findIndex((party) => party.id === partyId);
  } while (partyIndex <= -1);

  const partyChannel = client.channels.cache.get(parties[partyIndex].channelId);
  let result = await client.partyResults(guild, parties[partyIndex]);
  partyChannel.send(result);

  parties.splice(partyIndex, 1);

  await client.updateGuild(guild, { parties: parties });

  message.channel.send('Party Poll closed successfully Commander!');
};

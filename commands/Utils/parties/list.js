/*Lists all the active parties polls*/
module.exports = async (client, message, guild) => {
  const parties = await client.getParties(guild);
  let partiesList = [];

  if (parties.length === 0)
    return message.channel.send(
      'There are currently no party poll active in this server Commander!'
    );

  message.channel.send(
    'Here the list of the party polls active in this server Commander! :'
  );

  parties.forEach(({ title, endDate, id }) => {
    partiesList += `-${title} (${endDate}) (id: ${id})\n`;
  });

  message.channel.send(partiesList);
};

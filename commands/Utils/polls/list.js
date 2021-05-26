/*Lists all the active polls*/
module.exports = async (client, message, guild) => {
  const polls = await client.getPolls(guild);
  let pollsList = [];

  if (polls.length === 0)
    return message.channel.send(
      "There are currently no polls active in this server Commander!"
    );

  message.channel.send(
    "Here the list of the polls active in this server Commander! :"
  );

  polls.forEach(({ title, endDate, id }) => {
    pollsList += `-${title} (${endDate}) (id: ${id})\n`;
  });

  message.channel.send(pollsList);
};

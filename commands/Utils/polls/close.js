/*Closes a poll early*/
module.exports = async (client, message, guild) => {
  const list = require("./list");

  let polls = await client.getPolls(guild);

  if (polls.length === 0)
    return message.channel.send(
      "There are currently no polls active in this server Commander!"
    );

  let collected, pollId, pollIndex;

  do {
    if (pollId) message.channel.send("Invalid poll ID entered Commander!");

    await list(client, message, guild);
    collected = await client.promptUser(
      message,
      "What's the id of the poll you want to close Commander?"
    );

    if (!collected) return;

    pollId = collected.first().content;

    pollIndex = polls.findIndex((poll) => poll.id === pollId);
  } while (pollIndex <= -1);

  const pollChannel = client.channels.cache.get(polls[pollIndex].channelId);
  let result = await client.pollResults(polls[pollIndex]);
  pollChannel.send(result);

  polls.splice(pollIndex, 1);

  await client.updateGuild(guild, { polls: polls });

  message.channel.send("Poll closed successfully Commander!");
};

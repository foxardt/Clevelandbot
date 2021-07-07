/*Creates a new Poll with a set duration*/
module.exports = async (client, message, guild) => {
  const moment = require('moment');
  const displayPoll = require('./displayPoll');
  let polls = await client.getPolls(guild);

  let collected = await client.promptUser(
    message,
    'What shoudl i ask members Commander?'
  );

  if (!collected) return;

  let newPollTitle = collected.first().content.toLowerCase();

  let isValidOptions, newPollOptions, newPollOptionsParsed;

  do {
    if (newPollOptions)
      message.channel.send('Not enough / Too many options entered Commander!');

    collected = await client.promptUser(
      message,
      'What options should they have Commander? (min 2/max 10: option 1, option 2, etc)'
    );

    if (!collected) return;

    newPollOptions = collected.first().content.toLowerCase();

    newPollOptionsParsed = newPollOptions.split(', ');

    isValidOptions =
      newPollOptionsParsed.length <= 10 && newPollOptionsParsed.length > 1
        ? true
        : false;
  } while (!isValidOptions);

  let isValidDate, newPollDate;

  do {
    if (newPollDate) message.channel.send('Invalid date entered Commander!');

    collected = await client.promptUser(
      message,
      'When would you like me to end the poll Commander?'
    );

    if (!collected) return;

    newPollDate = collected.first().content;

    isValidDate = moment(newPollDate, 'DD/MM/YYYY HH:mm', true).isValid();

    if (isValidDate) {
      newPollDate = moment(newPollDate, 'DD/MM/YYYY HH:mm');
      break;
    }

    newPollDate = await client.parseDate(newPollDate);

    isValidDate = moment(newPollDate, 'DD/MM/YYYY HH:mm', true).isValid();
  } while (!isValidDate);

  newPollDate = new Date(newPollDate);

  let isValidId, newPollChannelId;

  do {
    collected = await client.promptUser(
      message,
      'In which channel should i set the poll Commander?'
    );

    if (!collected) return;

    newPollChannelId = collected.first().mentions.channels.first();

    isValidId = newPollChannelId !== undefined ? true : false;

    if (isValidId) break;

    message.channel.send('Invalid/No channel entered Commander!');
  } while (!isValidId);

  newPollChannelId = newPollChannelId.id;

  let newOptionsArray = [];
  newPollOptionsParsed.forEach((newOption) => {
    newOptionsArray = [...newOptionsArray, { option: newOption, voteCount: 0 }];
  });

  let newPoll = {
    authorId: message.author.id,
    title: newPollTitle,
    options: newOptionsArray,
    endDate: newPollDate,
    channelId: newPollChannelId,
  };

  newPoll.id = await displayPoll(newPoll, client, guild);

  polls = [...polls, newPoll];

  await client.updateGuild(guild, { polls: polls });

  await client.checkPolls();

  message.channel.send(
    `Poll "${newPollTitle}" successfully created Commander!`
  );
};

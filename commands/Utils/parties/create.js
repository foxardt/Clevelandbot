/*Creates a new Poll for a party with a set duration*/
module.exports = async (client, message, guild) => {
  const moment = require('moment');
  const displayParty = require('./displayParty');
  let parties = await client.getParties(guild);

  let collected = await client.promptUser(
    message,
    'What shoudl i ask members Commander?'
  );

  if (!collected) return;

  let newPartyTitle = collected.first().content.toLowerCase();

  let isValidOptions, newPartyOptions, newPartyOptionsParsed;

  do {
    if (newPartyOptions)
      message.channel.send('Not enough / Too many options entered Commander!');

    collected = await client.promptUser(
      message,
      'What options should they have Commander? (min 1/max 10: option 1, option 2, etc)'
    );

    if (!collected) return;

    newPartyOptions = collected.first().content.toLowerCase();

    newPartyOptionsParsed = newPartyOptions.split(', ');

    isValidOptions =
      newPartyOptionsParsed.length <= 10 && newPartyOptionsParsed.length >= 1
        ? true
        : false;
  } while (!isValidOptions);

  let isValidDate, newPartyDate;

  do {
    if (newPartyDate) message.channel.send('Invalid date entered Commander!');

    collected = await client.promptUser(
      message,
      'When would you like me to end the poll Commander?'
    );

    if (!collected) return;

    newPartyDate = collected.first().content;

    isValidDate = moment(newPartyDate, 'DD/MM/YYYY HH:mm', true).isValid();

    if (isValidDate) {
      newPartyDate = moment(newPartyDate, 'DD/MM/YYYY HH:mm');
      break;
    }

    newPartyDate = await client.parseDate(newPartyDate);

    isValidDate = moment(newPartyDate, 'DD/MM/YYYY HH:mm', true).isValid();
  } while (!isValidDate);

  newPartyDate = new Date(newPartyDate);

  let isValidId, newPartyChannelId;

  do {
    collected = await client.promptUser(
      message,
      'In which channel should i set the poll Commander?'
    );

    if (!collected) return;

    newPartyChannelId = collected.first().mentions.channels.first();

    isValidId = newPartyChannelId !== undefined ? true : false;

    if (isValidId) break;

    message.channel.send('Invalid/No channel entered Commander!');
  } while (!isValidId);

  newPartyChannelId = newPartyChannelId.id;

  let newOptionsArray = [];
  newPartyOptionsParsed.forEach((newOption) => {
    newOptionsArray = [
      ...newOptionsArray,
      { option: newOption, participants: [] },
    ];
  });

  let newParty = {
    authorId: message.author.id,
    title: newPartyTitle,
    options: newOptionsArray,
    endDate: newPartyDate,
    channelId: newPartyChannelId,
  };

  newParty.id = await displayParty(newParty, client, guild);

  parties = [...parties, newParty];

  await client.updateGuild(guild, { parties: parties });

  await client.checkParties();

  message.channel.send(
    `Poll party "${newPartyTitle}" successfully created Commander!`
  );
};

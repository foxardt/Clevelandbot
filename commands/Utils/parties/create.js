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

  let isValidEmote, isGuildEmote, newPartyEmote;

  do {
    if (newPartyEmote)
      message.channel.send('You did not enter a valid emote Commander!');

    collected = await client.promptUser(
      message,
      'What emote should members react with Commander?'
    );

    let emoteregex = /<:.+:(\d+)>|<a:.+:(\d+)>/g;
    let matchregex = /<a:.+?:\d+>|<:.+?:\d+>/g;

    if (!collected) return;

    newPartyEmote = collected.first().content;

    const emotematch = newPartyEmote.match(matchregex);

    if (!emotematch) {
      isValidEmote = false;
      continue;
    }

    if (emotematch.length > 1) {
      isValidEmote = false;
      continue;
    }

    let emoji = emoteregex.exec(emotematch);

    if (!emoji) {
      isValidEmote = false;
      continue;
    }

    isGuildEmote = guild.emojis.cache.get(emoji[1]);

    if (!isGuildEmote) {
      isValidEmote = false;
      continue;
    }

    newPartyEmote = emoji[1];

    isValidEmote = true;
  } while (!isValidEmote);

  let isValidDate, newPartyDate;

  do {
    if (newPartyDate) message.channel.send('Invalid date entered Commander!');

    collected = await client.promptUser(
      message,
      'When would you like me to end the poll Commander?'
    );

    if (!collected) return;

    newPartyDate = collected.first().content.toLowerCase();

    isValidDate = moment(newPartyDate, 'DD/MM/YYYY HH:mm', true).isValid();
    if (isValidDate) break;

    newPartyDate = await client.parseDate(newPartyDate);

    isValidDate = moment(newPartyDate, 'DD/MM/YYYY HH:mm', true).isValid();
  } while (!isValidDate);

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

  let newParty = {
    authorId: message.author.id,
    title: newPartyTitle,
    emote: newPartyEmote,
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

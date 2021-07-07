/*Closes any party poll that reached ending date*/
module.exports = (client) => {
  client.checkParties = async () => {
    require('./getGuild')(client);
    require('./updateGuild')(client);
    require('./getParties')(client);
    require('./partyResults')(client);
    const moment = require('moment');
    const guildIdList = client.guilds.cache.map((guild) => guild.id);

    for (guildId of guildIdList) {
      let guild = await client.guilds.fetch(guildId);
      let parties = await client.getParties(guild);
      if (!parties) return;
      for (let party of parties) {
        let currentTime = moment();
        const partyChannel = client.channels.cache.get(party.channelId);
        const partyMessage = await partyChannel.messages.fetch(party.id);
        const partyId = party.id;
        const partyIndex = parties.findIndex((party) => party.id === partyId);

        if (
          moment(party.endDate) === currentTime ||
          moment(party.endDate).isBefore(currentTime)
        ) {
          if (partyIndex > -1) {
            parties.splice(partyIndex, 1);
          }

          let result = await client.partyResults(guild, party);
          partyChannel.send(result);

          await client.updateGuild(guild, { parties: parties });
        } else {
          const numberEmojis = [
            '1️⃣',
            '2️⃣',
            '3️⃣',
            '4️⃣',
            '5️⃣',
            '6️⃣',
            '7️⃣',
            '8️⃣',
            '9️⃣',
            '🔟',
          ];

          const filter = (reaction, user) => {
            return (
              numberEmojis.includes(reaction.emoji.name) &&
              user.id !== client.user.id
            );
          };

          let collector = partyMessage.createReactionCollector(filter, {
            dispose: true,
          });

          collector.on('collect', async (collected, user) => {
            const userId = user.id;
            let collectedEmoji = collected.emoji.name;
            let currentTime = moment();
            if (
              moment(party.endDate) === currentTime ||
              moment(party.endDate).isBefore(currentTime)
            ) {
              return collector.stop();
            }
            collectedEmojiIndex = numberEmojis.findIndex(
              (emoji) => emoji === collectedEmoji
            );
            party.options[collectedEmojiIndex].participants = [
              ...party.options[collectedEmojiIndex].participants,
              userId,
            ];
            party[partyIndex] = party;
            await client.updateGuild(guild, { parties: parties });
          });

          collector.on('remove', async (collected, user) => {
            const userId = user.id;
            let collectedEmoji = collected.emoji.name;
            let currentTime = moment();
            if (
              moment(party.endDate) === currentTime ||
              moment(party.endDate).isBefore(currentTime)
            ) {
              return collector.stop();
            }
            const userIndex =
              party.options[collectedEmojiIndex].participants.indexOf(userId);
            collectedEmojiIndex = numberEmojis.findIndex(
              (emoji) => emoji === collectedEmoji
            );
            party.options[collectedEmojiIndex].participants.splice(
              userIndex,
              1
            );
            party[partyIndex] = party;
            await client.updateGuild(guild, { parties: parties });
          });
        }
      }
    }
  };
};

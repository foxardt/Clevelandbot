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
        let currentTime = moment().format('DD/MM/YYYY HH:mm');
        const partyChannel = client.channels.cache.get(party.channelId);
        const partyMessage = await partyChannel.messages.fetch(party.id);
        const partyId = party.id;
        const partyIndex = parties.findIndex((party) => party.id === partyId);

        if (party.endDate === currentTime || party.endDate < currentTime) {
          if (partyIndex > -1) {
            parties.splice(partyIndex, 1);
          }

          let result = await client.partyResults(guild, party);
          partyChannel.send(result);

          await client.updateGuild(guild, { parties: parties });
        } else {
          const partyEmoji = guild.emojis.cache.get(party.emote);

          const filter = (reaction, user) => {
            return (
              reaction.emoji.id === partyEmoji.id && user.id !== client.user.id
            );
          };

          let collector = partyMessage.createReactionCollector(filter, {
            dispose: true,
          });

          collector.on('collect', async (collected, user) => {
            const userId = user.id;
            let currentTime = moment().format('DD/MM/YYYY HH:mm');
            if (party.endDate === currentTime || party.endDate < currentTime) {
              return collector.stop();
            }
            if (party.participants.indexOf(userId)) {
              party.participants = [...party.participants, userId];
              parties[partyIndex] = party;
              await client.updateGuild(guild, { parties: parties });
            }
          });

          collector.on('remove', async (collected, user) => {
            const userId = user.id;
            let currentTime = moment().format('DD/MM/YYYY HH:mm');
            if (party.endDate === currentTime || party.endDate < currentTime) {
              return collector.stop();
            }
            const userIndex = party.participants.indexOf(userId);
            party.participants.splice(userIndex, 1);
            parties[partyIndex] = party;
            await client.updateGuild(guild, { parties: parties });
          });
        }
      }
    }
  };
};

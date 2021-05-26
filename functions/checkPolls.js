/*Closes any poll that reached ending date*/
module.exports = (client) => {
  client.checkPolls = async () => {
    require("./getGuild")(client);
    require("./updateGuild")(client);
    require("./getPolls")(client);
    require("./pollResults")(client);
    const moment = require("moment");
    const guildIdList = client.guilds.cache.map((guild) => guild.id);

    for (guildId of guildIdList) {
      let guild = await client.guilds.fetch(guildId);
      let polls = await client.getPolls(guild);
      if (!polls) return;
      for (let poll of polls) {
        let currentTime = moment().format("DD/MM/YYYY HH:mm");
        const pollChannel = client.channels.cache.get(poll.channelId);
        const pollMessage = await pollChannel.messages.fetch(poll.id);
        const pollId = poll.id;
        const pollIndex = polls.findIndex((poll) => poll.id === pollId);

        if (poll.endDate === currentTime || poll.endDate < currentTime) {
          if (pollIndex > -1) {
            polls.splice(pollIndex, 1);
          }

          let result = await client.pollResults(poll);
          pollChannel.send(result);

          await client.updateGuild(guild, { polls: polls });
        } else {
          const numberEmojis = [
            "1️⃣",
            "2️⃣",
            "3️⃣",
            "4️⃣",
            "5️⃣",
            "6️⃣",
            "7️⃣",
            "8️⃣",
            "9️⃣",
            "🔟",
          ];

          const filter = (reaction, user) => {
            return (
              numberEmojis.includes(reaction.emoji.name) &&
              user.id !== client.user.id
            );
          };

          let collector = pollMessage.createReactionCollector(filter, {
            dispose: true,
          });

          collector.on("collect", async (collected) => {
            let collectedEmoji = collected.emoji.name;
            collectedEmojiIndex = numberEmojis.findIndex(
              (emoji) => emoji === collectedEmoji
            );
            poll.options[collectedEmojiIndex].voteCount = collected.count;
            polls[pollIndex] = poll;
            await client.updateGuild(guild, { polls: polls });
          });

          collector.on("remove", async (collected) => {
            let collectedEmoji = collected.emoji.name;
            collectedEmojiIndex = numberEmojis.findIndex(
              (emoji) => emoji === collectedEmoji
            );
            poll.options[collectedEmojiIndex].voteCount = collected.count;
            polls[pollIndex] = poll;
            await client.updateGuild(guild, { polls: polls });
          });
        }
      }
    }
  };
};

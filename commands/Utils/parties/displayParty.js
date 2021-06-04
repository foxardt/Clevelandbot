/*Diplays a party poll in designated channel*/
module.exports = async (party, client, guild) => {
  const Discord = require('discord.js');

  const author = await guild.members.fetch(party.authorId);
  const channel = await client.channels.cache.get(party.channelId);
  const partyEmoji = guild.emojis.cache.get(party.emote);

  const newPartyEmbed = new Discord.MessageEmbed()
    .setTitle(party.title)
    .setDescription(
      `React with ${partyEmoji.toString()} if you want to participate!`
    )
    .setFooter(
      `Poll created by ${author.displayName} | Ends on ${party.endDate}`,
      author.user.avatarURL()
    );

  let message = await channel.send(newPartyEmbed);

  message.react(partyEmoji);

  return message.id;
};

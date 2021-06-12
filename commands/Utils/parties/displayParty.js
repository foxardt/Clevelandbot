/*Diplays a party poll in designated channel*/
module.exports = async (party, client, guild) => {
  const Discord = require('discord.js');

  const author = await guild.members.fetch(party.authorId);
  const channel = await client.channels.cache.get(party.channelId);
  let optionsField = '';
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

  const newPartyEmbed = new Discord.MessageEmbed()
    .setTitle(party.title)
    .setFooter(
      `Poll created by ${author.displayName} | Ends on ${party.endDate}`,
      author.user.avatarURL()
    );

  for (let i = 0; i < party.options.length; i++) {
    optionsField += `${numberEmojis[i]} ${party.options[i].option}\n`;
  }

  newPartyEmbed.setDescription(optionsField);

  let message = await channel.send(newPartyEmbed);

  for (let i = 0; i < party.options.length; i++) {
    message.react(numberEmojis[i]);
  }

  return message.id;
};

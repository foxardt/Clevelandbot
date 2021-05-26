/*Diplays a poll in designated channel*/
module.exports = async (poll, client, guild) => {
  const Discord = require("discord.js");
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

  const author = await guild.members.fetch(poll.authorId);
  const channel = await client.channels.cache.get(poll.channelId);
  let optionsField = "";

  const newPollEmbed = new Discord.MessageEmbed()
    .setTitle(poll.title)
    .setFooter(
      `Poll created by ${author.displayName} | Ends on ${poll.endDate}`,
      author.user.avatarURL()
    );

  for (let i = 0; i < poll.options.length; i++) {
    optionsField += `${numberEmojis[i]} ${poll.options[i].option}\n`;
  }

  newPollEmbed.setDescription(optionsField);

  let message = await channel.send(newPollEmbed);

  for (let i = 0; i < poll.options.length; i++) {
    message.react(numberEmojis[i]);
  }

  return message.id;
};

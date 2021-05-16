/*Enable member logs module | Enabled module and assign channelId for logs in the DB*/
module.exports = async (client, message, guild) => {
  const { prefix } = require("../../../config");
  const { enabled } = await client.getMemberLogs(guild);
  if (enabled) {
    return message.channel.send(
      `Members logs are already enabled Commander! If you want to modify them use **${prefix}memberlogs modify** !`
    );
  }

  let collected = await client.promptUser(
    message,
    "Where would you like me to log member infos Commander?"
  );

  let { id: channelId } = collected.first().mentions.channels.first();
  if (!channelId) {
    return message.channel.send("You didn't mention any channel Commander!");
  }

  let settings = {
    memberLogs: { enabled: true, channelId: channelId },
  };
  await client.updateGuild(guild, settings);
  message.channel.send(
    `Members logs successfully enabled in <#${channelId}> Commander!`
  );
};

/*Lists all triggers present in a server*/
module.exports = async (client, message, guild) => {
  const triggers = await client.getTriggers(guild);
  let triggerList = [];
  if (triggers.length === 0)
    return message.channel.send(
      "There's currently no triggers set up in this server Commander!"
    );
  message.channel.send(
    "Here the list of triggers set up in this server Commander! :"
  );
  triggers.forEach(({ trigger }) => {
    triggerList += `-${trigger} \n`;
  });
  message.channel.send(triggerList);
};

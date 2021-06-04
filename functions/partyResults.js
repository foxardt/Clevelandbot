/*Returns the participants to a party*/
module.exports = (client) => {
  client.partyResults = async (guild, party) => {
    let partyResult = `Party "${party.title}" is closed! Here are the participants Commander: \n`;
    let member;

    await party.participants.forEach(async (participant) => {
      member = await guild.members.fetch(participant);
      partyResult += `-${member.user.username} \n`;
    });

    return partyResult;
  };
};

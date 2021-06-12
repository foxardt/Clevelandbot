/*Returns the participants to a party*/
module.exports = (client) => {
  client.partyResults = async (guild, party) => {
    let partyResult = `Party "${party.title}" is closed! Here are the participants Commander: \n`;
    let member;

    for (let i = 0; i < party.options.length; i++) {
      partyResult += `Party ${party.options[i].option}:\n`;
      for (let y = 0; y < party.options[i].participants.length; y++) {
        member = await guild.members.fetch(party.options[i].participants[y]);
        partyResult += `-${member.user.username} \n`;
      }
    }

    return partyResult;
  };
};

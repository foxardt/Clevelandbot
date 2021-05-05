/*Executes when bots joins a server*/
module.exports = async (client, guild) => {
  //Store owner id and discord tag
  ownerID = guild.ownerID;
  owner = await guild.members.fetch(ownerID);
  ownerTag = owner.user.tag;

  //Store guild and owner infos in object
  const newGuild = {
    guildID: guild.id,
    guildName: guild.name,
    ownerID: guild.ownerID,
    ownerUsername: ownerTag,
  };

  //Enter guild and owner infos into the database
  try {
    await client.createGuild(newGuild);
  } catch (error) {
    console.error(error);
  }
};

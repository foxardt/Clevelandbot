/*Executes when bots joins a server | Creates a new document with guild/owner id/name and default settings in the DB */
module.exports = async (client, guild) => {
  const guildInfo = await client.getGuild(guild);
  if (guildInfo.guildID) return;

  ownerID = guild.ownerID;
  owner = await guild.members.fetch(ownerID);
  ownerTag = owner.user.tag;

  const newGuild = {
    guildID: guild.id,
    guildName: guild.name,
    ownerID: guild.ownerID,
    ownerUsername: ownerTag,
  };

  try {
    await client.createGuild(newGuild);
  } catch (error) {
    console.error(error);
  }
};

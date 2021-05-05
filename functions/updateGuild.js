/*Updates a setting for a guild into database*/
module.exports = (client) => {
  client.updateGuild = async (guild, settings) => {
    let data = await client.getGuild(guild);

    if (typeof data !== "object") data = {};
    for (const key in settings) {
      if (data[key] !== settings[key]) data[key] = settings[key];
      else return;
    }

    console.log(
      `Guild "${data.guildName}" updated settings: ${Object.keys(settings)}`
    );
    return await data.updateOne(settings);
  };
};

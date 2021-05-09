/*Retrieve the infos from a specific guild from the database*/
module.exports = (client) => {
  const { Guild } = require("../models");
  client.getGuild = async (guild) => {
    let data = await Guild.findOne({ guildID: guild.id });
    if (data) return data;
    else return client.config.defaultSettings;
  };
};

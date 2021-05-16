/*Creates a new guild document and inserts it into database*/
const mongoose = require("mongoose");
const { Guild } = require("../models");

module.exports = (client) => {
  client.createGuild = async (settings) => {
    let defaults = Object.assign(
      { _id: mongoose.Types.ObjectId() },
      client.config.defaultSettings
    );
    let merged = Object.assign(defaults, settings);

    const newGuild = await new Guild(merged);
    return newGuild.save().then(() => {
      let date = client.getCurrentDate();
      console.log(
        `${date}: Default settings saved for guild "${merged.guildName}" (${merged.guildID})`
      );
    });
  };
};

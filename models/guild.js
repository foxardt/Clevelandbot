const mongoose = require("mongoose");

const GuildSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  guildID: String,
  guildName: String,
  ownerID: String,
  ownerUsername: String,
  memberLogs: { enabled: Boolean, channelId: String },
});

module.exports = mongoose.model("Guild", GuildSchema);

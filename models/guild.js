const mongoose = require("mongoose");

const GuildSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  guildID: String,
  guildName: String,
  ownerID: String,
  ownerUsername: String,
  memberLogs: { enabled: { type: Boolean, default: false }, channelId: String },
  triggers: [{ trigger: String, reply: String }],
  reminders: [
    {
      id: Number,
      userId: String,
      name: String,
      message: String,
      date: String,
      channelId: String,
    },
  ],
});

module.exports = mongoose.model("Guild", GuildSchema);

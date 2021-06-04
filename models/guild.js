const mongoose = require('mongoose');

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
      userId: String,
      name: String,
      message: String,
      date: String,
      channelId: String,
    },
  ],
  polls: [
    {
      id: String,
      authorId: String,
      title: String,
      options: [{ option: String, voteCount: Number }],
      endDate: String,
      channelId: String,
    },
  ],
  parties: [
    {
      id: String,
      authorId: String,
      title: String,
      emote: String,
      participants: [String],
      endDate: String,
      channelId: String,
    },
  ],
});

module.exports = mongoose.model('Guild', GuildSchema);

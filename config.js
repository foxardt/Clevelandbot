require('dotenv').config();

module.exports = {
  owner: process.env.OWNER,
  prefix: process.env.PREFIX,
  mongoURI: process.env.MONGO_URI,
  defaultSettings: {
    memberLogs: { enabled: false, channelId: '' },
    triggers: [],
    reminders: [],
    polls: [],
    parties: [],
  },
};

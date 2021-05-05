require("dotenv").config();

module.exports = {
  owner: process.env.OWNER,
  prefix: process.env.PREFIX,
  mongoURI: process.env.MONGO_URI,
};

/*Executes when bot is logged in and ready*/
module.exports = async (client) => {
  const { prefix } = require('../config');
  client.user.setActivity(`${prefix}help`);
  await client.checkReminders();
  await client.checkPolls();
  await client.checkParties();
  setInterval(async () => {
    if (client.user.presence.activities[0] !== `${prefix}help`)
      client.user.setActivity(`${prefix}help`);
    await client.checkReminders();
    await client.checkPolls();
    await client.checkParties();
  }, 1000 * 60);

  let date = client.getCurrentDate();
  console.log(`${date}: Logged in as ${client.user.tag}!`);
};

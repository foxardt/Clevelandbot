/*Executes when bot is logged in and ready*/
module.exports = (client) => {
  let date = client.getDate();
  console.log(`${date}: Logged in as ${client.user.tag}!`);
};

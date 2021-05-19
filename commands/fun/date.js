/*Basic command | prefix.ping |Bot answers with pong | Basic skeleton for new commands (will be removed later)*/
module.exports = {
  name: "date",
  description: "date!",
  async execute(client, message, args) {
    let collected = await client.promptUser(message, "Enter date:");

    if (!collected) return;

    parsedDate = await client.parseReminderDate(collected.first().content);
    message.channel.send(parsedDate);
  },
};

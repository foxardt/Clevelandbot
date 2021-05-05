/*Basic command | prefix.ping |Bot answers with pong | Basic skeleton for new commands (will be removed later)*/
module.exports = {
  name: "ping",
  description: "Ping!",
  execute(client, message, args) {
    message.channel.send("Pong.");
  },
};

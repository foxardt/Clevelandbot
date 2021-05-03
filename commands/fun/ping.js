/*Basic command | use prefix.ping and bot answers with pong (will be removed later)*/
exports.run = (client, message, args) => {
    message.channel.send('Pong!')
}

exports.help = {
    name: 'ping'
}
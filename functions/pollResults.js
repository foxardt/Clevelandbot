/*Returns the result from a poll*/
module.exports = (client) => {
  client.pollResults = async (poll) => {
    let reactionCount = [];
    let tie = false;
    poll.options.forEach((option) => {
      reactionCount = [...reactionCount, option.voteCount];
      tie =
        reactionCount.indexOf(Math.max(...reactionCount)) !==
        reactionCount.lastIndexOf(Math.max(...reactionCount))
          ? true
          : false;
    });

    let pollResult;

    if (tie) {
      let tiesArray = reactionCount.map(
        (element) => element === Math.max(...reactionCount)
      );

      let tiesIndex = [];

      for (let i = 0; i < tiesArray.length; i++) {
        if (tiesArray[i] === true) tiesIndex = [...tiesIndex, i];
      }

      pollResult = `Poll "${poll.title}" ended! There has been a tie on the vote bewtween: \n`;
      for (let i = 0; i < tiesIndex.length; i++) {
        pollResult += `-${poll.options[tiesIndex[i]].option} \n`;
      }
      pollResult += `<@${poll.authorId}>`;
    } else {
      let mostReacted = reactionCount.indexOf(Math.max(...reactionCount));
      pollResult = `Poll "${poll.title}" ended! "${poll.options[mostReacted].option}" won the poll! <@${poll.authorId}>`;
    }

    return pollResult;
  };
};

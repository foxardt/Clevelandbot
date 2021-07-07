/*Parse a reminder date and returns date in format DD/MM/YYYY HH:MM*/
module.exports = (client) => {
  client.parseDate = async (collectedDate) => {
    const moment = require('moment');
    let parsedDate;
    let parsedData = [];
    let dateArray = collectedDate.split(', ');
    dateArray.forEach((date) => {
      let [value, unit] = date.split(' ');
      parsedData = [...parsedData, { value, unit }];
    });
    parsedDate = moment();
    parsedData.forEach(({ value, unit }) => {
      parsedDate.add(value, unit);
    });
    if (
      parsedDate.format('DD/MM/YYYY HH:mm') ===
      moment().format('DD/MM/YYYY HH:mm')
    )
      return 'invalid';
    return parsedDate;
  };
};

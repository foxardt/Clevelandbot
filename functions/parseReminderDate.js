/*Parse a reminder date and returns date in format DD/MM/YYYY HH:MM*/
module.exports = (client) => {
  client.parseReminderDate = async (collectedDate) => {
    const moment = require("moment");
    let parsedDate;
    let parsedData = [];
    dateArray = collectedDate.split(", ");
    dateArray.forEach((date) => {
      let [value, unit] = date.split(" ");
      parsedData = [...parsedData, { value, unit }];
    });
    parsedDate = moment();
    parsedData.forEach(({ value, unit }) => {
      parsedDate.add(value, unit);
    });
    parsedDate = parsedDate.format("DD/MM/YYYY HH:mm");
    if (parsedDate === moment().format("DD/MM/YYYY HH:mm")) return "invalid";
    return parsedDate;
  };
};

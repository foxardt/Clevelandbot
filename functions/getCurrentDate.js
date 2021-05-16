/*Returns current date to format DD/MM/yyyy HH:mm:ss*/
module.exports = (client) => {
  client.getCurrentDate = () => {
    const moment = require("moment");

    return moment().format("DD/MM/yyyy HH:mm:ss");
  };
};

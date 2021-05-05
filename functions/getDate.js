/*Returns current date to format dd/MM/yyyy HH:mm:ss*/
module.exports = (client) => {
  client.getDate = () => {
    const { format } = require("date-fns");
    return format(Date.now(), "dd/MM/yyyy HH:mm:ss");
  };
};

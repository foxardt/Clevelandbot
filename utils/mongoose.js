//Imports
const mongoose = require("mongoose");
const { mongoURI } = require("../config");
<<<<<<< HEAD
const { format } = require("date-fns");
=======
const moment = require("moment");
>>>>>>> testing

module.exports = {
  init: () => {
    const dbOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: false,
      poolSize: 5,
      connectTimeoutMS: 10000,
      family: 4,
    };

    mongoose.connect(mongoURI, dbOptions);
    mongoose.set("useFindAndModify", false);
    mongoose.Promise = global.Promise;

    mongoose.connection.on("connected", () => {
<<<<<<< HEAD
      let date = format(Date.now(), "dd/MM/yyyy HH:mm:ss");
=======
      let date = moment().format("DD/MM/yyyy HH:mm:ss");
>>>>>>> testing
      console.log(`${date}: Mongoose connection successfully opened!`);
    });

    mongoose.connection.on("err", (err) => {
<<<<<<< HEAD
      let date = format(Date.now(), "dd/MM/yyyy HH:mm:ss");
=======
      let date = moment().format("DD/MM/yyyy HH:mm:ss");
>>>>>>> testing
      console.error(`${date}: Mongoose connection error: \n ${err.stack}`);
    });

    mongoose.connection.on("disconnected", () => {
<<<<<<< HEAD
      let date = format(Date.now(), "dd/MM/yyyy HH:mm:ss");
=======
      let date = moment().format("DD/MM/yyyy HH:mm:ss");
>>>>>>> testing
      console.log(`${date}: Mongoose connection disconnected`);
    });
  },
};

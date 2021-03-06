//Imports
const mongoose = require("mongoose");
const { mongoURI } = require("../config");
const moment = require("moment");

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
      let date = moment().format("DD/MM/yyyy HH:mm:ss");
      console.log(`${date}: Mongoose connection successfully opened!`);
    });

    mongoose.connection.on("err", (err) => {
      let date = moment().format("DD/MM/yyyy HH:mm:ss");
      console.error(`${date}: Mongoose connection error: \n ${err.stack}`);
    });

    mongoose.connection.on("disconnected", () => {
      let date = moment().format("DD/MM/yyyy HH:mm:ss");
      console.log(`${date}: Mongoose connection disconnected`);
    });
  },
};

//Load client functions from utils folder
exports.functionsLoader = async (client) => {
  const fs = require("fs");
  await fs.readdir("./functions/", (err, files) => {
    if (err) return console.error;
    files.forEach((file) => {
      if (!file.endsWith(".js")) return;
      require(`./functions/${file}`)(client);
      let funcName = file.split(".")[0];
      console.log(`Loaded function '${funcName}'`);
    });
  });
};

//Load events from event folder
exports.eventLoader = (client) => {
  const fs = require("fs");
  fs.readdir("./events/", (err, files) => {
    if (err) return console.error;
    files.forEach((file) => {
      if (!file.endsWith(".js")) return;
      const evt = require(`./events/${file}`);
      let evtName = file.split(".")[0];
      console.log(`Loaded event '${evtName}'`);
      client.on(evtName, evt.bind(null, client));
    });
  });
};

//Load commands from commands folders
exports.commandLoader = (client) => {
  const fs = require("fs");
  const { Collection } = require("discord.js");
  client.commands = new Collection();
  fs.readdir("./commands/", async (err, folders) => {
    if (err) return console.error;
    folders.forEach((folder) => {
      fs.readdir(`./commands/${folder}/`, async (err, files) => {
        files.forEach((file) => {
          if (err) return console.error;
          if (!file.endsWith(".js")) return;
          let props = require(`./commands/${folder}/${file}`);
          let cmdName = file.split(".")[0];
          console.log(`Loaded command '${cmdName}'`);
          client.commands.set(cmdName, props);
        });
      });
    });
  });
};

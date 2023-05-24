const lineConfig = require("./../utils/lineConfig");
const textMessage = require("./lineAction");

const handleEvent = (event, client) => {
  console.log(client);
  console.log(event);

  if (event.type !== "message" || event.message.type !== "text") {
    return Promise.resolve(null);
  }

  if (event.message.type === "text") {
    textMessage.message(event, client);
  }
};

exports.handleEvent241 = (event) => {
  handleEvent(event, lineConfig.client241);
};

exports.handleEvent493 = (event) => {
  handleEvent(event, lineConfig.client493);
};

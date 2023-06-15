
exports.handleEvent = async (event, client) => {
  console.log(event);

  // Accept only text messages at this time
  if (event.type !== "message" || event.message.type !== "text") {
    return Promise.resolve(null);
  }

};
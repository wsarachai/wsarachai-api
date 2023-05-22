const line = require('@line/bot-sdk');

const config241 = {
  course: "IT241",
  channelAccessToken: process.env.LINE_ACCESS_TOKEN241,
  channelSecret: process.env.LINE_CHANNEL_SECRET241
};

const config493 = {
  course: "IT493",
  channelAccessToken: process.env.LINE_ACCESS_TOKEN493,
  channelSecret: process.env.LINE_CHANNEL_SECRET493
};

exports.client241 = new line.Client(config241);
exports.client493 = new line.Client(config493);
exports.middleware241 = line.middleware(config241);
exports.middleware493 = line.middleware(config493);

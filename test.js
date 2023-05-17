const dotenv = require('dotenv');
const express = require('express');
const line = require('@line/bot-sdk');
const route = express.Router();

dotenv.config({
  path: './config.env'
});

const webHookController = require('./controllers/webhookController');

const config = {
  channelAccessToken: process.env.LINE_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET
};

// const webhook = (req, res) => {
//   Promise
//     .all(req.body.events.map(handleEvent))
//     .then((result) => res.json(result));
// };

route.post('/', webHookController.webHook);

const app = express();
app.use(line.middleware(config));
app.use('/api/v1/webhook', route);

const client = new line.Client(config);
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: event.message.text
  });
}

app.listen(4000);
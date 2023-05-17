const express = require('express');
const line = require('@line/bot-sdk');
const webHookController = require('./../controllers/webhookController');

const route = express.Router();

const config = {
  channelAccessToken: process.env.LINE_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET
};

route.use(line.middleware(config));
route.route('/').post(webHookController.webHook);

module.exports = route;

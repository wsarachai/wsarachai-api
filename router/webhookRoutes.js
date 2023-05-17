const express = require('express');
const webHookController = require('./../controllers/webhookController');

const route = express.Router();

route.route('/').post(webHookController.webHook);

module.exports = route;

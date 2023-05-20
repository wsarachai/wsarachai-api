const express = require('express');
const webHookController = require('../controllers/webhookController');
const lineConfig = require('./../utils/lineConfig');


const route = express.Router();

route.route('/it241').post(lineConfig.middleware241, webHookController.webHook241);
route.route('/it493').post(lineConfig.middleware493, webHookController.webHook493);

module.exports = route;

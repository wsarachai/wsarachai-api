const express = require("express");
const lineWebHookController = require("../controllers/lineWebhookController");
const lineConfig = require("../utils/lineConfig");

const route = express.Router();

route
  .route("/it241")
  .post(lineConfig.middleware241, lineWebHookController.webHook241);
route
  .route("/it493")
  .post(lineConfig.middleware493, lineWebHookController.webHook493);

module.exports = route;

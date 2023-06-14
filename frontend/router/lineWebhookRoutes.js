const express = require("express");
const lineWebHookController = require("../controllers/lineWebhookController");
const lineConfig = require("../utils/lineConfig");

const router = express.Router();

router.route('/auth').get(lineWebHookController.auth);

router
  .route("/itsci")
  .post(lineConfig.middlewareITSCI, lineWebHookController.webHookITSCI);
router
  .route("/it241")
  .post(lineConfig.middleware241, lineWebHookController.webHook241);
router
  .route("/it493")
  .post(lineConfig.middleware493, lineWebHookController.webHook493);

module.exports = router;

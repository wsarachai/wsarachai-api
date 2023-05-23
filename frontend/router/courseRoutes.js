const express = require("express");
const courseController = require("../controllers/courseController");
const router = express.Router();

router.use((req, res, next) => {
  bootstrap.init();
  bootstrap.initDefault();
  next();
});

router
  .route("/")
  .get(courseController.getAll())
  .post(courseController.create());

module.exports = router;

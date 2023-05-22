const express = require("express");
const studentController = require("./../controllers/studentController");
const router = express.Router();

router.use((req, res, next) => {
  bootstrap.init();
  bootstrap.initDefault();
  next();
});

router
  .route("/register")
  .get(studentController.createStudentFrm)
  .post(studentController.createStudent);

router
  .route("/atten")
  .get(studentController.atten)
  .post(studentController.attenCheck);

module.exports = router;

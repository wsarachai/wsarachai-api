const express = require("express");
const studentController = require("./../controllers/studentController");
const router = express.Router();

router.use((req, res, next) => {
  bootstrap.init();
  bootstrap.initDefault();
  next();
});

router.route("/profile")
  .get(studentController.getStudentFrm)
  .post(studentController.updateStudent);

router.route("/line/:id")
  .get(studentController.getStudentByLineId);

router.route("/userId/:id")
  .get(studentController.getStudentById);

router.route("/atten")
  .get(studentController.attenForm)
  .post(studentController.atten);

router.route("/check-atten")
  .get(studentController.attenCheck);

module.exports = router;

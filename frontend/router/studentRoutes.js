const express = require("express");
const studentController = require("./../controllers/studentController");
const router = express.Router();

router.use((req, res, next) => {
  bootstrap.init();
  bootstrap.initDefault();
  next();
});

//router.route("/all")
//  .get(studentController.getAllStudent);
router.route("/:id")
  .get(studentController.getStudentByLineId);

router.route("/register")
  .get(studentController.createStudentFrm)
  .post(studentController.updateStudent);

router
  .route("/atten")
  .get(studentController.atten)
  .post(studentController.attenCheck);

module.exports = router;

const express = require("express");
const courseController = require("../controllers/courseController");
const route = express.Router();

route
  .route("/")
  .get(courseController.getAllCourses)
  .post(courseController.createCourse);
route
  .route("/:id")
  .get(courseController.getCourse)
  .patch(courseController.updateCourse)
  .delete(courseController.deleteCourse);
route.route("/code/:id").get(courseController.findByCourseCode);

module.exports = route;

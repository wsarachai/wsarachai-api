import express from "express";
import courseController from "../controllers/courseController";
const router = express.Router();

router
  .route("/")
  .get(courseController.getAllCourses)
  .post(courseController.createCourse);
router
  .route("/:id")
  .get(courseController.getCourse)
  .patch(courseController.updateCourse)
  .delete(courseController.deleteCourse);
router.route("/code/:id").get(courseController.findByCourseCode);

export default router;

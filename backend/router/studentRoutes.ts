import express from "express";
import studentController from "../controllers/studentController";
const router = express.Router();

router.route("/").get(studentController.getAll).post(studentController.create);
router
  .route("/:id")
  .get(studentController.get)
  .patch(studentController.update)
  .delete(studentController.delete);
router.route("/userId/:id").get(studentController.findById);

export default router;

import express from "express";
import courseController from "../controllers/courseController";
const router = express.Router();

router.route("/").get(courseController.getAll).post(courseController.create);
router
  .route("/:id")
  .get(courseController.get)
  .patch(courseController.update)
  .delete(courseController.delete);
router.route("/code/:id").get(courseController.findByCode);

export default router;

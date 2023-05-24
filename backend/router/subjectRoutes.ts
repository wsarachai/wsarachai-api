import express from "express";
import subjectController from "../controllers/subjectController";
const router = express.Router();

router.route("/").get(subjectController.getAll).post(subjectController.create);
router
  .route("/:id")
  .get(subjectController.get)
  .patch(subjectController.update)
  .delete(subjectController.delete);
router.route("/userId/:id").get(subjectController.findById);

export default router;

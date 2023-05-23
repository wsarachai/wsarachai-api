import express from "express";
import userController from "../controllers/userController";
const router = express.Router();

router.route("/").get(userController.getAll).post(userController.create);
router
  .route("/:id")
  .get(userController.get)
  .patch(userController.update)
  .delete(userController.delete);
router.route("/userId/:id").get(userController.findById);

export default router;

import express from "express";
import userController from "../controllers/userController";
const router = express.Router();

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);
router.route("/userId/:id").get(userController.findByUserId);

export default router;

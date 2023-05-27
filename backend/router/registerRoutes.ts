import express from "express";
import registerController from "../controllers/registerController";
const router = express.Router();

router
  .route("/")
  .get(registerController.getAll)
  .post(registerController.create);
router
  .route("/:id")
  .get(registerController.get)
  .patch(registerController.update)
  .delete(registerController.delete);
router.route("/code/:id").get(registerController.findByCode);
router.route("/student/:id").get(registerController.findByStudentCode);

export default router;

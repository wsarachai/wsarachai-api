import express from "express";
import SessionController from "../controllers/sessionController";
const router = express.Router();

router.route("/").get(SessionController.getAll).post(SessionController.create);
router
  .route("/:id")
  .get(SessionController.get)
  .patch(SessionController.update)
  .delete(SessionController.delete);
router.route("/code/:id").get(SessionController.findByCode);

export default router;

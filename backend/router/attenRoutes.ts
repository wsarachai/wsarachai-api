import express from "express";
import attenController from "../controllers/attenController";
const router = express.Router();

router
  .route("/")
  .get(attenController.getAll)
  .post(attenController.create);
router
  .route("/:id")
  .get(attenController.get)
  .patch(attenController.update)
  .delete(attenController.delete);

export default router;

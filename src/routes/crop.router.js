import { Router } from "express";
import controller from "../controllers/crop.controller";

const router = Router();

router
  .route("/")
  .get(controller.getMany)
  .post(controller.createOn);

router
  .route("/:id")
  .put(controller.updateOne)
  .get(controller.getOne);

export default router;

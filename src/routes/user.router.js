import { Router } from "express";
import controllers from "../controllers/user.controller";

const router = Router();

router.route("/").get(controllers.getMany);

router
  .route("/:id")
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.removeOne);

export default router;

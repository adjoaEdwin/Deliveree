import { Router } from "express";
import { User } from "../models/user.models";
import { me, updateMe, getOne } from "../controllers/user.controller";

const router = Router();

/**
 * Handle the HTTP request for a list of all Employees
 */

router.get("/", me);
router.get("/user/dashboard", getOne);
router.put("/", updateMe);

export default router;

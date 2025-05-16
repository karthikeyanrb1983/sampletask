/** @format */

import { Router } from "express";
import { getTasks, createTask } from "../controllers/taskController";
import { authenticate } from "../middleware/auth";

const router = Router();

router.get("/", authenticate, getTasks);
router.post("/", authenticate, createTask);

export default router;

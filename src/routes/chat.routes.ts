/** @format */

import { Router } from "express";
import { importChat } from "../controllers/chatController";
import { authenticate } from "../middleware/auth";
import upload from "../middleware/upload";

const router = Router();

router.post("/import", authenticate, upload.single("file"), importChat);

export default router;

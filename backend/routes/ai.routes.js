import express from "express";
import {
  getReview,
  getPastPrompts,
  updateReview,
  deleteReview,
} from "../controllers/ai.controller.js";

import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/get-review", isAuthenticated, getReview);
router.get("/past-prompts", isAuthenticated, getPastPrompts);
router.put("/past-prompts/:id", isAuthenticated, updateReview);
router.delete("/past-prompts/:id", isAuthenticated, deleteReview);

export default router;
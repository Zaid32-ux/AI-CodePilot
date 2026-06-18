import axios from "axios";
import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { Prompt } from "../Model/promptSchema.js";
import aiService from "../services/ai.service.js";

// ---------------- GENERATE REVIEW ----------------
export const getReview = catchAsyncErrors(async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({
      success: false,
      message: "Code is required!",
    });
  }

  const review = await aiService(code);

  const prompt = await Prompt.create({
    code,
    review,
  });

  res.status(201).json({
    success: true,
    message: "Review generated successfully!",
    prompt,
  });
});

// ---------------- GET ALL PROMPTS ----------------
export const getPastPrompts = catchAsyncErrors(async (req, res) => {
  const prompts = await Prompt.find().sort({
    createdAt: -1,
  });

  res.status(200).json({
    success: true,
    prompts,
  });
});

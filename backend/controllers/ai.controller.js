import axios from "axios";
import Prompt from "../Model/prompt.js";
import aiService from "../services/ai.Service.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";

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
  user: req.user._id,
  code,
  review,
});

  res.status(201).json({
    success: true,
    review,     // IMPORTANT (frontend expects this)
    prompt,
  });
});

// ---------------- GET ALL PROMPTS ----------------
export const getPastPrompts = catchAsyncErrors(async (req, res) => {
const prompts = await Prompt.find({
  user: req.user._id,
}).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    prompts,
  });
});

// ---------------- UPDATE REVIEW ----------------
export const updateReview = catchAsyncErrors(async (req, res) => {
  const { id } = req.params;
  const { code } = req.body;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Invalid ID!",
    });
  }

  const review = await aiService(code);

Prompt.findOneAndUpdate(
  {
    _id: id,
    user: req.user._id,
  },
  {
    code,
    review,
  },
  {
    new: true,
  }
);

  if (!updatedPrompt) {
    return res.status(404).json({
      success: false,
      message: "Prompt not found!",
    });
  }

  res.status(200).json({
    success: true,
    review,
    prompt: updatedPrompt,
  });
});

// ---------------- DELETE REVIEW ----------------
export const deleteReview = catchAsyncErrors(async (req, res) => {
  const { id } = req.params;

  const prompt = await Prompt.findOne({
  _id: id,
  user: req.user._id,
});

  if (!prompt) {
    return res.status(404).json({
      success: false,
      message: "Prompt not found!",
    });
  }

  await prompt.deleteOne();

  res.status(200).json({
    success: true,
    message: "Review deleted successfully!",
  });
});
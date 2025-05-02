import { Router } from "express";
import express from "express";
import authMiddleware from "../../middlewares/authMiddleware.js";
import { addMeal } from "../../controllers/MealController.js";

const router = express.Router();

router.post(
  "/add",
  authMiddleware,
  (req, res, next) => {
    console.log("Incoming req to add a meal");
    next();
  },
  addMeal,
);

export default router;

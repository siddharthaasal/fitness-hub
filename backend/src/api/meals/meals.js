import { Router } from "express";
import express from "express";
import authMiddleware from "../../middlewares/authMiddleware.js";
import { addMeal } from "../../controllers/MealController.js";
import { fetchMeals } from "../../controllers/MealController.js";
import { deleteMeal } from "../../controllers/MealController.js";

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

router.get(
  "/get",
  authMiddleware,
  (req, res, next) => {
    console.log("Incoming req to fetch meals received over backend");
    next();
  },
  fetchMeals,
);

router.delete(
  "/delete",
  authMiddleware,
  (req, res, next) => {
    console.log("Incoming req to delete meal received over backend");
    next();
  },
  deleteMeal,
);

export default router;

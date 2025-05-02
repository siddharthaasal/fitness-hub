import prisma from "../config/prisma.js";
import { mealDescToNutritionalData } from "../utils/ai.js";

async function addMeal(req, res) {
  const mealDescription = req.body.description;
  console.log("Inside the add meal function of MealController");
  console.log(
    "Inside MealController, meal desrciption received is : ",
    mealDescription,
  );
  const data = await mealDescToNutritionalData(mealDescription);
  // console.log("Data after ai in meal controller: ", data);
  return res.status(200).json({ data: data });
}

export { addMeal };

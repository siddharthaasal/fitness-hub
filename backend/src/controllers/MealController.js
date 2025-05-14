import prisma from "../config/prisma.js";
import { mealDescToNutritionalData } from "../utils/ai.js";

async function addMeal(req, res) {
  // console.log("test:", req.user.userId);
  const userId = req.user.userId;
  const mealDescription = req.body.description;

  console.log("Inside addMeal, received description:", mealDescription);

  try {
    const response = await mealDescToNutritionalData(mealDescription);

    // Parse the JSON response string to an object
    const clean = response.replace(/```json|```/g, "").trim();

    const data = JSON.parse(clean);

    // Create the meal entry in the DB
    const newMeal = await prisma.meal.create({
      data: {
        userId: userId, // You must ensure this is coming from auth
        name: mealDescription,
        calories: parseInt(data.calories) || 0,
        carbohydrates: parseInt(data.carbohydrates) || 0,
        proteins: parseInt(data.proteins) || 0,
        fats: parseInt(data.fats) || 0,
        fiber: parseInt(data.fiber) || 0,
      },
    });

    return res.status(201).json({ meal: newMeal });
  } catch (error) {
    console.error("Error in addMeal:", error);
    return res.status(500).json({ error: "Failed to add meal." });
  }
}

async function fetchMeals(req, res) {
  console.log("Inside fetchMeals, MealController");

  const userId = req.user.userId;
  const date = req.query.date;
  if (!date || !userId) {
    return res.status(400).json({ error: "Date or user ID missing" });
  }

  const { start, end } = getISTBoundsFromLocalDate(date);

  console.log(start);
  console.log(end);


  const meals = await prisma.meal.findMany({
    where: {
      userId: userId,
      timestamp: {
        gte: start,
        lte: end,
      },
    },
    orderBy: {
      timestamp: "asc",
    },
  });

  console.log("meals fetched on backend: ", meals);

  return res.status(200).json({ meals });

}

async function deleteMeal(req, res) {
  console.log("Inside Meal Controller to del meal")
  const mealId = req.body.id;
  try {
    await prisma.meal.delete({
      where: {
        id: mealId,
      },
    })
    console.log("Meal Deleted")
    return res.status(200).json({ message: "Meal deleted" });
  } catch (error) {
    console.error("Error deleting meal in the MealController: ", error);
    return res.status(500).json({ error: "Failed to delete meal." });
  }
}

function getISTBoundsFromLocalDate(localDateStr) {
  // Example: "2025-05-13"
  const [year, month, day] = localDateStr.split("-").map(Number);

  // Construct as IST (Asia/Kolkata has UTC+5:30)
  const startIST = new Date(Date.UTC(year, month - 1, day, -5, -30, 0)); // midnight IST
  const endIST = new Date(Date.UTC(year, month - 1, day, 18, 29, 59, 999)); // 23:59:59 IST

  return { start: startIST, end: endIST };
}




export { addMeal, fetchMeals, deleteMeal };

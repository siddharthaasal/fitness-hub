import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function main() {
  // const response = await ai.models.generateContent({
  //   model: "gemini-2.0-flash",
  //   contents: "Explain how AI works in a few words",
  // });
  // console.log(response.text);
  // mealDescToNutritionalData("2 slices of brown bread");
}

// await main();

async function mealDescToNutritionalData(mealDescription) {
  const basePrompt = `Given the following meal description, estimate the nutritional values and return them in JSON format with the following fields:
    {
      "calories": "in kcal",
      "carbohydrates": "in grams",
      "proteins": "in grams",
      "fats": "in grams",
      "fiber": "in grams",
      "iron": "in mg",
      "calcium": "in mg",
      "vitamin_c": "in mg",
      "vitamin_a": "in µg",
      "potassium": "in mg"
    }
    Meal description:\n`;
  const finalizedPrompt = basePrompt + mealDescription;
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: finalizedPrompt,
  });
  console.log("Data returned from the AI Model:", response.text);
  const result = response.text;
  return result;
}

export { mealDescToNutritionalData };

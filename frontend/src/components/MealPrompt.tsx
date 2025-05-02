import { useState } from "react";
import axios from "axios";

export default function MealPrompt() {
  const [mealDescription, setMealDescription] = useState("");
  const [test, setTest] = useState(false);
  const [res, setRes] = useState();

  async function addMeal() {
    console.log(mealDescription);
    const response = await axios.post(
      "http://localhost:3001/api/meals/add",
      { description: mealDescription },
      { withCredentials: true },
    );
    const raw = response.data.data; // from your AI response

    // Step 1: Remove markdown code block formatting
    const cleaned = raw.replace(/```json\n?|```/g, "");

    // Step 2: Parse the JSON string to a JS object
    let parsed;
    try {
      parsed = JSON.parse(cleaned);
      console.log("Parsed Nutrition Data:", parsed);
    } catch (err) {
      console.error("Failed to parse JSON:", err);
    }

    // setTest(true);
    // setRes(JSON.parse(response.data));
    // console.log(JSON.stringify(response.data, null, 2));
  }

  return (
    <>
      <div className="flex flex-col items-center gap-4 p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-md">
        <input
          type="text"
          placeholder="Describe your meal..."
          value={mealDescription}
          onChange={(e) => setMealDescription(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addMeal();
            }
          }}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white dark:bg-gray-900 dark:text-white"
        />
        <button
          onClick={addMeal}
          className="w-full px-4 py-2 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 transition duration-200"
        >
          Add
        </button>
      </div>

      {test && (
        <div>
          <p>{res}</p>
        </div>
      )}
    </>
  );
}

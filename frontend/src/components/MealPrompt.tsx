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
    const addedMeal = response.data.meal;
    console.log("Added meal returned to client: ", addedMeal);
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



interface NutritionProps {
    caloriesRequired: number;
    carbohydratesRequired: number;
    proteinsRequired: number;
    fatsRequired: number;
    fiberRequired: number;
}

export default function NutritionStats({ caloriesRequired, carbohydratesRequired, proteinsRequired, fatsRequired, fiberRequired }: NutritionProps) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-md max-w-lg mx-auto">
            <h2 className="text-xl font-semibold text-gray-800">🥗 Daily Nutritional Requirements</h2>
            <table className="w-full mt-3 border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">Nutrient</th>
                        <th className="border p-2">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td className="border p-2">Calories</td><td className="border p-2">{caloriesRequired} kcal</td></tr>
                    <tr><td className="border p-2">Carbohydrates</td><td className="border p-2">{carbohydratesRequired} g</td></tr>
                    <tr><td className="border p-2">Proteins</td><td className="border p-2">{proteinsRequired} g</td></tr>
                    <tr><td className="border p-2">Fats</td><td className="border p-2">{fatsRequired} g</td></tr>
                    <tr><td className="border p-2">Fiber</td><td className="border p-2">{fiberRequired} g</td></tr>
                </tbody>
            </table>
        </div>
    );
}

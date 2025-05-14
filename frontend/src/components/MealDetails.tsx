interface MealProps {
    id: number;
    idx: string;
    desc: string;
    cal: string;
    carbs: string;
    prot: string;
    fats: string;
    fib: string;
    onDelete: (id: number) => void;
}

export default function MealDetails({
    id,
    idx,
    desc,
    cal,
    carbs,
    prot,
    fats,
    fib,
    onDelete,
}: MealProps) {
    return (
        <div className="bg-white shadow-md rounded-2xl p-6 mb-4 border border-gray-200">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold text-gray-800">Meal {idx}</h2>
                <button
                    className="text-red-600 text-sm font-medium hover:underline"
                    onClick={() => onDelete(id)}
                >
                    Delete
                </button>
            </div>

            <p className="flex text-gray-600 italic mb-4">{desc}</p>

            <div className="flex flex-r gap-x-6 gap-y-2 text-sm text-gray-700">
                <p><span className="font-medium">Calories:</span> {cal}kcal</p>
                <p><span className="font-medium">Carbohydrates:</span> {carbs}g</p>
                <p><span className="font-medium">Proteins:</span> {prot}g</p>
                <p><span className="font-medium">Fats:</span> {fats}g</p>
                <p><span className="font-medium">Fiber:</span> {fib}g</p>
            </div>
        </div>
    );
}

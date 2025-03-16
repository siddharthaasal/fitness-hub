import { useForm } from "react-hook-form";
import { number, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate } from "react-router";



const profileSchema = z.object(
    {
        name: z.string().min(1, "Must be atleast 1 char"),
        age: z.coerce.number()
            .min(10, "It's time to enjoy your life, not track calories")
            .max(100, "Do not worry now old human, have rest."),
        gender: z.enum(["MALE", "FEMALE", "OTHER"]),
        height: z.coerce.number().min(50, "Height must be at least 50 cm").max(250, "Height must be realistic"),
        currentWeight: z.coerce.number().min(20, "Weight must be at least 20 kg").max(250, "Weight seems unrealistic"),
        goalWeight: z.coerce.number().min(20, "Goal weight must be at least 20 kg").max(250, "Set a realistic goal"),
        goalTimeFrame: z.coerce.number().min(1, "At least 1 month required").max(12, "1 year is the maximum timeframe"),

    }
);

type FormData = z.infer<typeof profileSchema>;

export default function EditProfile() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(profileSchema) });
    let navigate = useNavigate();

    const onSubmit = async (data: FormData) => {
        console.log("Form data: ", data);
        try {
            const response = await axios.post(
                "http://localhost:3001/api/auth/edit-profile",
                data,
                {
                    withCredentials: true

                }
            )

            if (response.status === 200) {
                console.log("Profile edited successfully.");
                navigate("/dashboard");
            }
        } catch (error) {
            console.error("Error editing profile.");
        }
    }
    return (
        <>
            <h3>Edit Profile</h3>
            <div>
                <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto p-4 border rounded-lg shadow-sm space-y-4">

                    {/* name */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">Name</label>
                        <input
                            {...register("name")}
                            placeholder="Siddharth Aasal"
                            className="border p-2 rounded-md focus:outline-none focus:ring focus:ring-gray-300"
                        />
                        {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                    </div>

                    {/* age */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">Age</label>
                        <input
                            type="number"
                            {...register("age")}
                            placeholder="21"
                            className="border p-2 rounded-md focus:outline-none focus:ring focus:ring-gray-300"
                        />
                        {errors.age && <p className="text-red-500 text-xs">{errors.age.message}</p>}
                    </div>

                    {/* gender */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">Gender</label>
                        <select
                            {...register("gender")}
                            className="border p-2 rounded-md focus:outline-none focus:ring focus:ring-gray-300"
                        >
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                            <option value="OTHER">Other</option>
                        </select>
                        {errors.gender && <p className="text-red-500 text-xs">{errors.gender.message}</p>}
                    </div>

                    {/* height */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">Height (cm)</label>
                        <input
                            type="number"
                            {...register("height")}
                            placeholder="180 (in cm)"
                            className="border p-2 rounded-md focus:outline-none focus:ring focus:ring-gray-300"
                        />
                        {errors.height && <p className="text-red-500 text-xs">{errors.height.message}</p>}
                    </div>

                    {/* current weight */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">Current Weight (kg)</label>
                        <input
                            type="number"
                            {...register("currentWeight")}
                            placeholder="68 (in kg)"
                            className="border p-2 rounded-md focus:outline-none focus:ring focus:ring-gray-300"
                        />
                        {errors.currentWeight && <p className="text-red-500 text-xs">{errors.currentWeight.message}</p>}
                    </div>

                    {/* goal weight */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">Goal Weight (kg)</label>
                        <input
                            type="number"
                            {...register("goalWeight")}
                            placeholder="75 (in kg)"
                            className="border p-2 rounded-md focus:outline-none focus:ring focus:ring-gray-300"
                        />
                        {errors.goalWeight && <p className="text-red-500 text-xs">{errors.goalWeight.message}</p>}
                    </div>

                    {/* goal time frame */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">Goal Time Frame (months)</label>
                        <input
                            type="number"
                            {...register("goalTimeFrame")}
                            placeholder="4 (in months)"
                            className="border p-2 rounded-md focus:outline-none focus:ring focus:ring-gray-300"
                        />
                        {errors.goalTimeFrame && <p className="text-red-500 text-xs">{errors.goalTimeFrame.message}</p>}
                    </div>

                    <button type="submit" className="w-full bg-gray-800 text-white p-2 rounded-md hover:bg-gray-700">
                        Save Profile
                    </button>
                </form>
            </div>
        </>
    )
}
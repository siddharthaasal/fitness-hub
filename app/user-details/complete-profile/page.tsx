"use client"


import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react";
import { useEffect } from "react";

enum GenderEnum {
    Male = "Male",
    Female = "Female",
    Other = "Other",
}

enum ActivityLevelEnum {
    High = "High",
    Medium = "Medium",
    Low = "Low",
}

const userDetailsSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters long"),
    gender: z.nativeEnum(GenderEnum, { required_error: "Please select a gender" }),
    age: z.number()
        .min(1, "Age must be grater than zero")
        .max(120, "Age must be less than 120"),
    height: z.number()
        .min(50, "Height must be at least 50 cm")
        .max(250, "Height must be less than or equal to 250 cm"),
    currentWeight: z.number()
        .min(20, "Weight must be at least 20 kg")
        .max(300, "Weight must be less than or equal to 300 kg"),
    goalWeight: z.number()
        .min(20, "Goal weight must be at least 20 kg")
        .max(300, "Goal weight must be less than or equal to 300 kg"),
    timeLeftToAchieveGoal: z.number(),
    activityLevel: z.nativeEnum(ActivityLevelEnum, { required_error: "Please select an Activity Level" })
})

type FormFields = z.infer<typeof userDetailsSchema>;

export default function () {

    //Fetch userId 
    const { data: session, status } = useSession();
    const userId = session?.user?.id;

    useEffect(() => {
        if (userId) {
            console.log("User id", userId);
        }
    }, [userId]);

    console.log(status);

    const { register, handleSubmit, formState: { errors } } = useForm<FormFields>({
        resolver: zodResolver(userDetailsSchema),
    });

    async function onSubmit(data: FormFields) {

        console.log("Form being collected in frontend is \n ", data);

        if (!userId) {
            console.error("Session does not exist");
            alert("Session expired: Please log in again");
            return;
        }

        const fromData = {
            ...data, userId,
        };

        try {
            const response = await fetch("http://localhost:3000/api/user-details/complete-profile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(fromData),
            });

            if (!response.ok) {
                throw new Error("Failed to submit data");
            }

            const result = await response.json();
            console.log("Backend response after submiting 'complete-profile' form: ", result);


        } catch (error) {
            console.error("Error submitting form: ", error);
            alert("Failed to submit");
        }
    }

    function onError(errors: any) {
        console.log("Errors are: ", errors);
    }



    return (
        <>
            <h1 className="text-2xl font-bold text-center mb-6">Complete your Profile</h1>

            <form
                onSubmit={handleSubmit(onSubmit, onError)}
                className="max-w-lg mx-auto p-8 bg-gray-300 shadow-md rounded-lg space-y-4"
            >
                <div className="flex flex-col">
                    <label className="font-semibold">Username</label>
                    <input
                        {...register("username")}
                        type="text"
                        placeholder="Username"
                        className="border rounded p-2 mt-1"
                    />
                    {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
                </div>

                <div className="flex flex-col">
                    <label className="font-semibold">Gender</label>
                    <select {...register("gender")} className="border rounded p-2 mt-1">
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                    {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
                </div>

                <div className="flex flex-col">
                    <label className="font-semibold">Age</label>
                    <input
                        {...register("age", { valueAsNumber: true })}
                        type="number"
                        placeholder="Age"
                        className="border rounded p-2 mt-1"
                    />
                    {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
                </div>

                <div className="flex flex-col">
                    <label className="font-semibold">Height</label>
                    <input
                        {...register("height", { valueAsNumber: true })}
                        type="number"
                        placeholder="Height (cm)"
                        className="border rounded p-2 mt-1"
                    />
                    {errors.height && <p className="text-red-500 text-sm">{errors.height.message}</p>}
                </div>

                <div className="flex flex-col">
                    <label className="font-semibold">Current Weight</label>
                    <input
                        {...register("currentWeight", { valueAsNumber: true })}
                        type="number"
                        step="0.01"
                        placeholder="Current Weight (kg)"
                        className="border rounded p-2 mt-1"
                    />
                    {errors.currentWeight && <p className="text-red-500 text-sm">{errors.currentWeight.message}</p>}
                </div>

                <div className="flex flex-col">
                    <label className="font-semibold">Goal Weight</label>
                    <input
                        {...register("goalWeight", { valueAsNumber: true })}
                        type="number"
                        step="0.01"
                        placeholder="Goal Weight (kg)"
                        className="border rounded p-2 mt-1"
                    />
                    {errors.goalWeight && <p className="text-red-500 text-sm">{errors.goalWeight.message}</p>}
                </div>

                <div className="flex flex-col">
                    <label className="font-semibold">Time to Achieve Goal</label>
                    <input
                        {...register("timeLeftToAchieveGoal", { valueAsNumber: true })}
                        type="number"
                        placeholder="Time to achieve goal (months)"
                        className="border rounded p-2 mt-1"
                    />
                    {errors.timeLeftToAchieveGoal && <p className="text-red-500 text-sm">{errors.timeLeftToAchieveGoal.message}</p>}
                </div>

                <div className="flex flex-col">
                    <label className="font-semibold">Activity Level</label>
                    <select {...register("activityLevel")} className="border rounded p-2 mt-1">
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                    {errors.activityLevel && <p className="text-red-500 text-sm">{errors.activityLevel.message}</p>}
                </div>

                <button type="submit" className="w-full bg-blue-500 text-white font-semibold p-3 rounded-lg hover:bg-blue-600">
                    Submit
                </button>
            </form>
        </>
    );

}
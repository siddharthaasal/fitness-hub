"use client"


import {z} from "zod";
import {useForm, SubmitHandler} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod"

enum GenderEnum{
    Male = "Male",
    Female = "Female",
    Other = "Other",
}

enum ActivityLevelEnum{
    High = "High",
    Medium = "Medium",
    Low = "Low",
}

const userDetailsSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters long"),
    gender: z.nativeEnum(GenderEnum,{required_error:"Please select a gender"}),
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
    activityLevel: z.nativeEnum(ActivityLevelEnum,{required_error:"Please select an Activity Level"})
})

type FormFields = z.infer<typeof userDetailsSchema>;

export default function(){
    
    const {register, handleSubmit, formState: {errors} } = useForm<FormFields>({
        resolver: zodResolver(userDetailsSchema),
    });
    

    return(
        <>
            <h1>Complete your Profile</h1>

            <form>

                <div>
                    <label>Username</label>
                    <input {...register("username")} type="text" placeholder="Username" />
                    {errors.username && <p>{errors.username.message}</p>}
                </div>

                <div>
                    <label>Gender</label>
                    <select {...register("gender")}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                    {errors.gender && <p>{errors.gender.message}</p>}
                </div>

                <div>
                    <label>Age</label>
                    <input {...register("age")} type="number" placeholder="Age (cm)" />
                    {errors.age && <p>{errors.age.message}</p>}
                </div>

                <div>
                    <label>Current Weight</label>
                    <input {...register("currentWeight")} type="number" step="0.01" placeholder="Current Weight (kg)" />
                    {errors.currentWeight && <p>{errors.currentWeight.message}</p>}
                </div>

                 <div>
                    <label>Goal Weight</label>
                    <input {...register("goalWeight")} type="number" step="0.01" placeholder="Goal Weight (kg)" />
                    {errors.goalWeight && <p>{errors.goalWeight.message}</p>}
                </div>
                
                <div>
                    <label>Time to Achieve Goal</label>
                    <input {...register("timeLeftToAchieveGoal")} type="number" placeholder="Time to achieve goal (months)" />
                    {errors.timeLeftToAchieveGoal && <p>{errors.timeLeftToAchieveGoal.message}</p>}
                </div>

                <div>
                    <label>Activity Level</label>
                    <select {...register("activityLevel")}>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                    {errors.activityLevel && <p>{errors.activityLevel.message}</p>}
                </div>
                

            </form>

        </>
    )
}
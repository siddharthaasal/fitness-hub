"use client"
import { useState } from "react"
import { useRouter } from "next/router"
import {z} from "zod";
import {useForm, SubmitHandler} from "react-hook-form";



export default function(){
    
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: "",
        gender: "",
        age: "",
        height: "",
        currentWeight: "",
        goalWeight: "",
        timeLeftToAchieveGoal: "",
        activityLevel: "",

    })
    return(
        <>
            <h1>Complete your Profile</h1>

        </>
    )
}
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { NavLink } from "react-router";
import axios from "axios";
// import { redirect } from 'react-router-dom'
import { useNavigate } from "react-router";


const formSchema = z.object({
    email: z.string().email("Invalid eemail address"),
    password: z.string().min(6, "Must be atleast 6 characters"),
})

type FormData = z.infer<typeof formSchema>;

export default function SignUp() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(formSchema), });
    let navigate = useNavigate();


    const onSubmit = async (data: FormData) => {
        console.log("Form Data:", data);

        try {
            const response = await axios.post(
                "http://localhost:3001/api/auth/signup",
                data
            )

            console.log(response);
            if (response.statusText === "OK") {
                console.log("Signup successful, redirecting you to SignIn page.")
                // return redirect("/signin");
                navigate("/signin");
            }
        } catch (error) {
            console.error("Error signing up:", error);
        }
    };

    return (
        <>
            <div>
                <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto p-4 border rounded-lg shadow-sm space-y-4">
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">Email</label>
                        <input
                            {...register("email")}
                            placeholder="any@email.com"
                            className="border p-2 rounded-md focus:outline-none focus:ring focus:ring-gray-300"
                        />
                        {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-medium">Password</label>
                        <input
                            type="password"
                            {...register("password")}
                            placeholder="Ulchar1."
                            className="border p-2 rounded-md focus:outline-none focus:ring focus:ring-gray-300"
                        />
                        {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
                    </div>

                    <button type="submit" className="w-full bg-gray-800 text-white p-2 rounded-md hover:bg-gray-700">
                        Sign Up
                    </button>
                </form>
                <NavLink to="/signin" className="text-black-100 hover:text-sky-500 ">Already Registered?</NavLink>
            </div >


        </>

    );
}


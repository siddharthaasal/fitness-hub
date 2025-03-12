import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


const formSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Must be alteast 6 char"),
})

type FormData = z.infer<typeof formSchema>;

export default function SignIn() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(formSchema) });

    const onSubmit = (data: FormData) => {
        console.log("Form data: ", data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto p-4 border rounded-lg shadow-sm space-y-4">
            <div className="flex flex-col">
                <label className="text-sm font-medium">Email</label>
                <input
                    {...register("email")}
                    placeholder="xyz@email.com"
                    className="border p-2 rounded-md focus:outline-none focus:ring focus:ring-gray-300"
                />
                {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
            </div>

            <div className="flex flex-col">
                <label className="text-sm font-medium">Password</label>
                <input
                    type="password"
                    {...register("password")}
                    placeholder="Abcd"
                    className="border p-2 rounded-md focus:outline-none focus:ring focus:ring-gray-300"
                />
                {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
            </div>

            <button type="submit" className="w-full bg-gray-800 text-white p-2 rounded-md hover:bg-gray-700">
                Sign In
            </button>
        </form>
    );
}
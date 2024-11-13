"use client"

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navabar from "./Navbar"
import { useEffect } from "react";


export default function Dashboard() {

    const { data: session, status } = useSession();
    const router = useRouter();

    async function checkUserDetails() {
        if (status === "authenticated" && session?.user?.id) {
            const response = await fetch(`/api/user-details/get-details/${session.user.id}`);
            const data = await response.json();
            console.log("User details \n", data);
            if (!data.details) {
                router.push("./user-details/complete-profile");
            } else {
                console.log("You have already filled your profile!!");
            }
        }
    }

    useEffect(() => {
        checkUserDetails()
    }, [status, session, router]);


    if (status === "loading") {
        return (
            <>Loading...</>
        )
    }

    return (
        <>
            <div>
                <Navabar />
            </div>
            <div className="mt-5">
                <h1>Welcome to Dashboard {session?.user?.name}</h1>
            </div>
            <div>
                {/* Footer */}
            </div>
        </>
    )
}



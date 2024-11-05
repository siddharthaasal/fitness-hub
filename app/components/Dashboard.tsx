"use client"

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react"
import Navabar from "./Navbar"


export default function Dashboard(){

    const {data: session, status} = useSession();
    // const router = useRouter();
    const [loading, setLoading] = useState(true);

    return(
        <>
            <div>
                <Navabar/>
            </div>
            <div className="mt-5">
                <h1>Welcome to Dashboard</h1>
                <h3>Welcome to Dashboard</h3>
            </div>
            <div>
                {/* Footer */}
            </div>
        </>
    )
}
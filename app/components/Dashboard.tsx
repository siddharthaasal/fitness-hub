"use client"

import { useSession } from "next-auth/react";
import { useState } from "react"
import Navabar from "./Navbar"


export default function Dashboard(){


    const {data: session} = useSession();
  

    return(
        <>
            <div>
                <Navabar/>
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
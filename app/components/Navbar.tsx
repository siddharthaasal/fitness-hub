"use client";
import { signIn, signOut, useSession } from "next-auth/react"

export default function Navabar(){

    const session = useSession();
    
    // if(session.data){
    // console.log(session.data.user)
    // }
    
    return(
        <>
            <div className="flex justify-between">
                <div>
                    Fithub
                </div>
                <div>
                    {session.data?.user && <button onClick={() => signOut()}>Logout</button>}
                    {!session.data?.user && <button onClick={() => signIn()}>Signin</button>}
                </div>
            </div>
        </>
    )
}



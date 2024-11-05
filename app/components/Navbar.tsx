"use client";
import { signIn, signOut, useSession } from "next-auth/react"

export default function Navabar(){

    const session = useSession();
    
    async function handleSignIn() {
        try{
            await signIn();
        }catch(error){
            console.error("Error while signing in: ", error);
        }
    }

    async function handleSignOut() {
        try{
            await signOut();
        }catch(error){
            console.error("Error while logging out: ", error);
        }
    }
    
    return(
        <>
            <div className="flex justify-between bg-blue-300  p-3">
                <div>
                    Fithub
                </div>
                <div>
                    {session.data?.user && <button onClick={handleSignOut}>Logout</button>}
                    {!session.data?.user && <button onClick={handleSignIn}>Signin</button>}
                </div>
            </div>           
        </>
    )
}



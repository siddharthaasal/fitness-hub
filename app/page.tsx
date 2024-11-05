"use client"

import Image from "next/image";
import Dashboard from "./components/Dashboard";
import Welcome from "./components/Welcome";

import { useSession } from "next-auth/react";

export default function Home() {

  const session = useSession();

  return (
    <>
    
    <main className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
      <>
        {session.data?.user && <Dashboard/>}
        {!session.data?.user && <Welcome/>}
      </>
    </main>
     
    </>
  );
}

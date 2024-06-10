"use client"

import Link from "next/link";
import Image from "next/image";
import React from 'react'
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

function NavBar() {
  const {data: session, status} = useSession()


  return (
    <nav className="m-4 p-1">
    <div className="w-full mx-auto flex justify-between items-end">
    {session && status === "authenticated"?<div>
      <Link href="/dashboard">
      <img
      src={session.user.image}
      alt={`${session.user.name}'s profile picture`}
      className="rounded-full w-10 h-10"
      width={60}
      height={60}
    />
        <h1 className="text-lg text-gray-800 text-left capitalize">{session.user.name}</h1>
      </Link>
    </div>:<div>Sign in with google</div>}

    { session && status === "authenticated" && <div className="text-lg font-bold hover:text-gray-800 hover:underline cursor-pointer" onClick={signOut}>Sign Out</div>}
    </div>
    </nav>
  )
}

export default NavBar
"use client"

import Link from "next/link";
import React from 'react'
import { useSession } from "next-auth/react";

function Footer() {
  const {data: session, status} = useSession()


  return (
    <nav className="fixed bottom-0 z-10 m-4 p-2">
    {session && status === "authenticated"?<div>
      <Link href="/dashboard">
        <h1 className="text-am text-left capitalize">signed in as {session.user.name}</h1>
      </Link>
    </div >:<div className="text-sm">Sign in to view your email...</div>}
    </nav>
  )
}

export default Footer
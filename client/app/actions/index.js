'use client'

import { signIn } from 'next-auth/react'

export async function Login(formData) {
    const action = formData.get('action')
    
    if(action) await signIn(action, { redirect: "/dashboard"})
}

export async function LogOut(formData) {

}
'use client'

import { signOut } from "next-auth/react"
import { useSession } from "next-auth/react"

export default function UserInfo(){

    const {data: session} = useSession()
    return(
        <div class='contentbox'>
            <div class='content'>
                Name: <span>{session?.user?.name}</span>
            </div>
            <div class='content'>
                Email: <span>{session?.user?.email}</span>
            </div>
            <button type="button" class='logout' onClick={() => signOut()}>Log Out</button>
        </div>
    )
}
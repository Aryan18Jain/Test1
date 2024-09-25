'use client'

import { useRouter } from "next/navigation"

export default function RegisteredSuccessfully(){

    const router = useRouter()

    function clickHandler(){
        router.push('/')
    }
    return(
        <div class='contentbox'>
            <div class='content'>
                Registered Sucessfully !
            </div>
            <button type="button" class='login' onClick={clickHandler}>Log In</button>
        </div>
    )
}
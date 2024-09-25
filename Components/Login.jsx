'use client'

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login(){

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [error,setError] = useState("")

    const router = useRouter()

    async function handleSubmit(event){
        event.preventDefault()

        try {
            const res = await signIn('credentials',{
                email,
                password,
                redirect: false
            })
            if(res.error){
                setError("Invalid Credentials")
                return
            }
            console.log('Till Here')
            router.replace('dashboard')
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <div class="login-container">
        <div class="login-form">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="text" id="email" name="email" required onChange={(event) => {setEmail(event.target.value) ; setError('')}}></input>
                </div>
                
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" required onChange={(event) => {setPassword(event.target.value) ; setError('')}}></input>
                </div>
                <button type="submit" class='login'>Login</button>
            </form>
            { error && <button type='button' class='error'>{error}</button>}
            <Link class='register_text' href='/register'>Don't have account? <span>Register</span></Link>
        </div>
    </div>
    )
}
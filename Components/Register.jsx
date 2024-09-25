'use client'

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Regsiter(){

    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState('')
    const [isRegistered,setIsRegistered] = useState(false)
    const router = useRouter()

    const submitHandler = async(event) => {
        event.preventDefault()
        

        if(!name || !email || !password){
            setError("All Field Required")
            return
        }
        
        try {

            const responseUserExists = await fetch('api/userExists',{
                method: 'POST',
                headers:{
                    'content-type':'application/json'
                },
                body: JSON.stringify({email})
            })

            if(responseUserExists.ok){
                setError("User already exists")
                return
            }

            const response = await fetch('api/register',{
                method: 'POST',
                headers:{
                    'content-type':'application/json'
                },
                body: JSON.stringify({name,email,password})
            })
    
            if(response.ok){
                event.target.reset()
                router.push('/registered')
            }
        } catch (error) {
            setError("Registeration failed")
        }
    }
    
    

    return(
        <div class="login-container">
        <div class="login-form">
            <h1>Register</h1> 
            <form onSubmit={submitHandler}>
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" id="name" name="name" onChange={(event) => {setName(event.target.value); setError('')}}></input>
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="text" id="email" name="email" onChange={(event) => {setEmail(event.target.value); setError('')}}></input>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" onChange={(event) => {setPassword(event.target.value); setError('')}}></input>
                </div>
                <button type="submit" class='register'>Register</button>
            </form>
            {
                error && (<button type='button' class='error'>{error}</button>) 
            }
            {
                isRegistered && (<button type='button' class='sucess'>Registered
                
                
                
                
                
                
                
                </button>)
            }
            <Link className='register_text' href='/'>Alredy have account? <span>Login</span></Link>
        </div>
    </div>
    )
}
"use client";
import Link from "next/link";
import React from "react";
import {useRouter} from "next/navigation";
import {Axios} from "axios";


export default function LoginPage() {
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    })

    const onLogin = async () => {

    }


    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-center text-white text-4xl ">Login</h1>

            <hr />
            <label htmlFor="email">email</label>

            <input 
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                id="username" 
                type="text" 
                value={user.email} 
                onChange={(e) => setUser({...user, email: e.target.value})}
                placeholder="username" 
            />
        
            <label htmlFor="password">password</label>

            <input 
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                id="password" 
                type="password" 
                value={user.password} 
                onChange={(e) => setUser({...user, password: e.target.value})}
                placeholder="password" 
            />
            <button 
                onClick={onLogin}
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-500">Login
            </button>
            <p>Don't have an account?
                <Link href="/signup" className="text-blue-500"> Signup here </Link>
            </p>
        </div>
    )
}    
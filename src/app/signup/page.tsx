'use client'
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: ""
    })
    const [buttonDissbled, setButtonDissbled] = useState(true)
    const [loading, setLoading] = useState(false)
    const onSignup = async () => {
        try {
            setLoading(true)
            const response = await axios.post('/api/users/signup', user)
            console.log("Signup success", response.data)
            router.push('/login')
        } catch (error: any) {
            console.log("Signup failed", error.message)
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDissbled(false)
        } else {
            setButtonDissbled(true)
        }
    }, [user])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-2">
            <h1>{loading?"Loading":"Signup"}</h1>
            <label htmlFor="username">username</label>
            <input className="text-slate-800" type="text" id="username" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} placeholder="username"/>
            <label htmlFor="email">email</label>
            <input className="text-slate-800" type="email" id="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} placeholder="email"/>
            <label htmlFor="password">password</label>
            <input className="text-slate-800" type="password" id="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
            <button onClick={onSignup} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-400" placeholder="password">
                { buttonDissbled ? "No signup" : "Signup here"}
                </button>
            <Link href="/login">Login here</Link>
        </div>)
}
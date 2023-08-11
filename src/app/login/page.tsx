'use client'
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function LoginPage() {
    const router = useRouter()
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const [buttonDissbled, setButtonDissbled] = useState(true)
    const [loading, setLoading] = useState(false)


    const onLogin = async () => {
try {
    setLoading(true)
    const response = await axios.post('/api/users/login',user)
    console.log("Login success", response.data)
    router.push("/profile")
} catch (error: any) {
    console.log("Login failed", error.message)
    toast.error(error.message)
}finally{
    setLoading(false)
}
    }
    useEffect(()=>{
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDissbled(false)
        } else {
            setButtonDissbled(true)
        }
    },[user])
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-2">
            <h1>{loading?"Loading": "Login"}</h1>
            <label htmlFor="email">email</label>
            <input className="text-slate-800" placeholder="email" type="text" id="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
            <label htmlFor="password">password</label>
            <input className="text-slate-800" placeholder="password" type="password" id="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
            <button onClick={onLogin} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-400">{buttonDissbled?"No Login":"Login"}</button>
            <Link href="/signup">Signup here</Link>
        </div>)
}
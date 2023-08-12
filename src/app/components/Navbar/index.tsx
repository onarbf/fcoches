'use client'
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"


export default function NavBar(){
  const router = useRouter()
  const handleLogout = async ()=>{
    try {
      const response = await axios.get('/api/users/logout')
      toast.success('Logout successful')
      router.push('/user/login')
    console.log(response.data)
    } catch (error: any) {
      console.log(error.message)
      toast.error(error.message)
    }
  }
    return (
        <header className="flex flex-col ">
          <div className="border border-fgrey-300 bg-fgrey-100 flex justify-end px-2">
            <h1 className="text-4xl">
              <Link href="/">FCoches</Link>
              </h1>
          </div>

          <div className="border border-fgrey-300 bg-fgrey-100 flex justify-end px-2 mt-1">
            <ul className="flex gap-2 underline text-forange">

            <li><Link href="/user/signup">Registrarse</Link> </li>
            <li><Link href="/user/login">Identificarse</Link> </li>
            <li><button onClick={handleLogout}>Cerrar Sesión</button> </li>
            </ul>
          </div>

        </header>
    )
}
'use client'
import Link from "next/link"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

import { useSession } from "@/context/sessionContext"
import styles from "@/styles"
import {errorHandler} from "@/helpers/errorHandler"
import { requester } from "@/helpers/requester"
export default function NavBar(){
  const router = useRouter()
  const {session, removeSession} = useSession()
  const handleLogout = async ()=>{
    try {
      const data = await requester('/api/users/logout',{method: "GET"})
      removeSession();
      toast.success('Logout successful')
      router.refresh()

    } catch (error: any) {
      await errorHandler(error)
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
            <ul className="flex gap-2">

            {!session  && <li className={styles.link.default}><Link href="/user/signup">Registrarse</Link> </li>}
            {!session && <li className={styles.link.default}><Link href="/user/login">Identificarse</Link> </li>}
           {session && <li className={styles.link.default} ><Link  href="/post/publish">Publicar nuevo post</Link> </li>}
           {session && <li ><button className={styles.link.default} onClick={handleLogout}>Cerrar Sesión</button> </li>}
            </ul>
          </div>

        </header>
    )
}
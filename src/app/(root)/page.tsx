'use client'
import { useSession } from "@/context/sessionContext";
import styles from "../../styles";

export default function Home() {
  const {session} = useSession()
  console.log(session.isLogged)
  return (
    <main className="grow">
      <section className={styles.section.default}>
      <h2>Bienvenid@ a Fcoches, un original foro para hablar de todo, menos de coches.</h2>

      {!session.isLogged && <div className="flex flex-col justify-center">
        <p>¿Aún no tienes cuenta? ¡A qué esperas!</p>
        <button className={styles.button.primary(false)}>Registarse</button>
      </div>}

     </section>
    </main>
  )
}

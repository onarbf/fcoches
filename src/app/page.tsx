import { useSession } from "@/context/sessionContext";
import styles from "../styles";
import Link from "next/link";
import PostsList from "@/components/PostsList";

export default function Home() {

  return (
    <main className="grow">
      <section className={styles.section.default}>
      <h2>¡Bienvenid@ a Fcoches, un original foro para hablar de todo, menos de coches!</h2>
     </section>
     <PostsList/>
    </main>
  )
}

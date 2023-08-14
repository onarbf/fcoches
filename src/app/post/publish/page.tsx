'use client'
import styles from "@/styles";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";


export default function Publish() {
    const router = useRouter()
    const [post, setPost] = useState({
        title: "",
        body: "",
        category: "general"
    })
    const [loading, setLoading] = useState(false)
    const onSubmit = async () => {
        try {
            setLoading(true)
            const response = await fetch(`/api/posts`, {
                method: "post",
                body: JSON.stringify(post)
            })
            if (response.status === 200) {
                setPost({
                    title: "",
                    body: "",
                    category: "general"
                })
                router.push("/");
            }
        } catch (error: any) {
            console.log(error)
            toast.error(error.message)
        } finally {
            setLoading(false)
        }

    }
    return (<section className={styles.section.expand}>
        <div className="flex  flex-col grow gap-2 mx-2">
            <div className=" flex flex-col">
                <label>Titulo</label>
                <input type="text" id="title" value={post.title} onChange={(e) => setPost({ ...post, title: e.target.value })} className={styles.input.text} />
            </div>
            <div className=" flex flex-col">
                <label>Cuerpo del post</label>
                <textarea className={styles.input.text} id="body" value={post.body} onChange={(e) => setPost({ ...post, body: e.target.value })}></textarea>
            </div>
            <div className="pt-2">
                <button onClick={onSubmit} className={styles.button.primary(false)}>Publish</button>
            </div>

        </div>
    </section>)
}
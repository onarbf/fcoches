'use client'
import Wysiwyg from "@/components/Wysiwyg";
import { errorHandler } from "@/helpers/errorHandler";
import { requester } from "@/helpers/requester";
import styles from "@/styles";
import { useRouter } from "next/navigation";
import { useState } from "react";
import 'react-quill/dist/quill.snow.css';

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
            await requester(`/api/posts`, {
                method: "post",
                body: JSON.stringify(post)
            })
            setPost({
                title: "",
                body: "",
                category: "general"
            })
            router.push("/");

        } catch (error: any) {
            await errorHandler(error)
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
                <Wysiwyg content={post.body} setContent={(content:any) => setPost({ ...post, body: content })}/>
            <div className="pt-2">
                <button onClick={onSubmit} className={styles.button.primary(false)}>Publish</button>
            </div>

        </div>
    </section>)
}
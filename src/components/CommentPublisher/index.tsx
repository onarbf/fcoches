'use client'
import Wysiwyg from "@/components/Wysiwyg";
import { useSession } from "@/context/sessionContext";
import { errorHandler } from "@/helpers/errorHandler";
import { requester } from "@/helpers/requester";
import styles from "@/styles";
import { useRouter } from "next/navigation";
import { useState } from "react";
import 'react-quill/dist/quill.snow.css';

export default function CommentPublisher({ post }: any) {
    const router = useRouter()
    const { session } = useSession()
    
    const [comment, setComment] = useState({
        body: ""
    })
    const [loading, setLoading] = useState(false)
    const onSubmit = async () => {
        try {
            setLoading(true)
            await requester(`/api/comments?postId=${post._id}`, {
                method: "post",
                body: JSON.stringify(comment)
            })
            setComment({
                body: ""
            })
            router.refresh()
        } catch (error: any) {
            await errorHandler(error)
        } finally {
            setLoading(false)
        }

    }
    return (
        session ? <div className="flex flex-col grow gap-2 mx-2 mt-5">
            <Wysiwyg content={comment.body} setContent={(content: any) => setComment({ ...comment, body: content })} />
            <div className="pt-2">
                <button onClick={onSubmit} className={styles.button.primary(false)}>Comentar</button>
            </div>

        </div> : false)
}
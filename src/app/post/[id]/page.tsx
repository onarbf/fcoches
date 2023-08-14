import { errorHandler } from "@/helpers/errorHandler";
import { requester } from "@/helpers/requester";
import styles from "@/styles";
import { PostType } from "@/types";
import Link from "next/link";

const getPost = async (postId: string) => {
    try {
        const { post } = await requester(`${process.env.DOMAIN}/api/posts/${postId}`, {
            method: 'GET',
            cache: 'no-cache'

        })
        return (post)
    } catch (error: any) {
        await errorHandler(error)

    }
}
export default async function PostPage({ params }: any) {
    const { id } = params
    const post = await getPost(id)
    const { author } = post
    return (
        <section>
            <div className={styles.section.default}>
                <h1 className={styles.text.h1 + " font-bold"}>{post.title}
                </h1>
            </div>
            <section className="flex flex-col  mt-1 bg-fgrey-100" >
                <div className="flex grow border px-2 py-1 justify-between">
                    <div className={styles.text.small}>
                        {new Date(post.createdAt).getDay()}/
                        {new Date(post.createdAt).getMonth()}/
                        {new Date(post.createdAt).getFullYear()}
                        {" " + new Date(post.createdAt).getHours()}
                        :
                        {new Date(post.createdAt).getMinutes()}
                    </div>
                    <div className={styles.text.small}>#1</div>
                </div>

                <div>

                </div>
                <div className="flex flex-col sm:flex-row grow ">
                    <div className="border min-h-[42px] min-w-[200px] p-2 bg-fgrey-200">
                        <h2 className={styles.text.h2 + " text-forange "}><Link href="#">{author.username}</Link></h2>
                        <p>Hilos: {author.posts?.length || 0}</p>
                        <p>Commentarios: {author.comments?.length || 0}</p>
                    </div>
                    <div className="border grow flex flex-col">
                        <div className=" p-1">
                            <b>{post && <h1>{post.title}</h1>}</b>
                            <div className="min-w-full h-[1px] bg-black"></div>
                        </div>
                        <div className=" grow flex flex-col px-1 py-2">
                            {post && <div dangerouslySetInnerHTML={{__html: post.body}} />}
                        </div>
                    </div>
                </div>
            </section>
        </section>)
}
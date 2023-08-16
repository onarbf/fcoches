import CommentItem from "@/components/CommentItem";
import CommentPublisher from "@/components/CommentPublisher";
import { errorHandler } from "@/helpers/errorHandler";
import { requester } from "@/helpers/requester";
import styles from "@/styles";

const getPost = async (postId: string) => {
    try {
        const { post } = await requester(`${process.env.DOMAIN}/api/posts/${postId}`, {
            method: 'GET',
            cache: 'no-cache'

        })

        return post
    } catch (error: any) {
        await errorHandler(error)

    }
}
export default async function PostPage({ params }: any) {
    const { id } = params
    const post = await getPost(id)
    return (<>
        {post && <section>
            <div className={styles.section.default}>
                <h1 className={styles.text.h1 + " font-bold"}>{post.title}
                </h1>
            </div>
            <section className="flex flex-col  mt-1 bg-fgrey-100" >
                <div className="flex grow border px-2 py-1 justify-between">
                    <div className={styles.text.small}>
                        { new Date(post.createdAt).getDay()}/
                        { new Date(post.createdAt).getMonth()}/
                        { new Date(post.createdAt).getFullYear()}
                        { " " + new Date(post.createdAt).getHours()}
                        :
                        { new Date(post.createdAt).getMinutes()}
                    </div>
                    <div className={styles.text.small}>#1</div>
                </div>

                <div>

                </div>
               { <CommentItem comment={post} />}

            </section>
            <div className="mt-2">
                { post.comments.map((comment: any) =>{
                    console.log(comment.body)
                return <CommentItem comment={comment} key={comment._id} />})}
            </div>
            <div className="border mt-2 bg-fgrey-200">
                <CommentPublisher post={post} />
            </div>
        </section>}
        </>)
}
import styles from "@/styles";
import Link from "next/link";

export default function CommentItem({comment}: any){
    return(
        <div className="flex flex-col sm:flex-row grow mt-1 bg-fgrey-100">
                    <div className="border min-h-[42px] min-w-[200px] p-2 bg-fgrey-200">
                        <h2 className={styles.text.h2 + " text-forange "}><Link href="#">{comment.author.username}</Link></h2>
                        <p>Hilos: {comment.author.posts?.length || 0}</p>
                        <p>Commentarios: {comment.author.comments?.length || 0}</p>
                    </div>
                    <div className="border grow flex flex-col">
                    {comment.title && <div className=" p-1">
                             <b><h1>{comment.title}</h1></b>
                            <div className="min-w-full h-[1px] bg-black"></div>
                        </div>}
                        <div className=" grow flex flex-col px-1 py-2">
                            {comment && <div dangerouslySetInnerHTML={{__html: comment.body}} />}
                        </div>
                    </div>
        </div>
    )
}
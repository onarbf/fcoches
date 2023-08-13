
import styles from '@/styles'
import PostListItem from './PostListItem'
import errorHandler from '@/helpers/errorHandler'
import { PostType } from '@/types'
import axios from 'axios'
import { cookies } from 'next/headers'

const getPosts = async ()=>{
    try {
        const response = await fetch(`${process.env.DOMAIN}/api/posts`,{
            cache: "no-cache"
        })
        const {posts} = await response.json();
        return posts
    } catch (error: any) {
        console.log(error)
    }
} 
export default async function PostsList() {

    const posts =  await getPosts()

    return (<div className={styles.section.expand}>
        <ul className="flex flex-col grow mx-2">
            <li className="flex grow min-w-full  bg-forange text-white border border-fgrey-300">
                <div className="flex grow gap-2 items-center font-bold">
                    <div className="px-2 flex min-w-[72px] justify-center">
                    </div>
                    <div className="px-2 min-w-[72px] text-center">Hora</div>
                    <div className="px-2 min-w-[100px] text-center">Categoría</div>
                    <div className="px-2 grow">Tema</div>
                </div>
            </li>
            {posts && posts.map((post: any)=><PostListItem key={post._id } post={post} />)}
        </ul>

    </div>)
}
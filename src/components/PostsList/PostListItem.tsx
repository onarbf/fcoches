
import { PostType } from '@/types'
import Link from 'next/link'
import { BiMailSend } from 'react-icons/bi'
interface Props{
    post: PostType
}


export default function PostListItem({post}: Props) {
    return (<li className="flex grow min-w-full">
        <div className="flex grow gap-2 border items-center ">
            <div className="px-2 flex min-w-[72px] justify-center">
                <BiMailSend />
            </div>
            <div className="px-2 min-w-[72px] text-center">{new Date(post.createdAt).getHours()}:{new Date(post.createdAt).getMinutes()}</div>
            <div className="px-2  min-w-[100px] text-center">{post.category}</div>
            <div className="px-2 grow text-forange underline"><Link href="#">{post.title}</Link></div>
        </div>
    </li>)
}
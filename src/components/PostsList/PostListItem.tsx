'use client'
import { BiMailSend } from 'react-icons/bi'
interface Props{
    post: any
}
export default function PostListItem({post}: Props) {
    return (<li className="flex grow min-w-full">
        <div className="flex grow gap-2 border items-center ">
            <div className="px-2 flex min-w-[72px] justify-center">
                <BiMailSend />
            </div>
            <div className="px-2 min-w-[72px] text-center">16:34</div>
            <div className="px-2  min-w-[100px] text-center">Categoría</div>
            <div className="px-2 grow">Tema</div>
        </div>
    </li>)
}
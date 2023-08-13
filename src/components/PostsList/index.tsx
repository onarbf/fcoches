'use client'
import styles from '@/styles'
import PostListItem from './PostListItem'

export default function PostsList() {
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
            <PostListItem post={{}} />
        </ul>

    </div>)
}
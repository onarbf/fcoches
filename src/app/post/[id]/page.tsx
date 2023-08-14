import styles from "@/styles";

const getPost = async ()=>{
    try {
        const response = await fetch('/api/post/findOne')
    } catch (error: any) {
        console.log(error.message)
        
    }
}
export default function Post(){
    return <section className={styles.section.expand}>
this is a post
    </section>
}
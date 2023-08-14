import toast from "react-hot-toast";

export async function requester(url: string, options: any  ){
    const response = await fetch(url,options)
    const data = await response.json()
    if(response.status > 500){
        if(data && data.message){
            toast.error(data.message)
            throw new Error(data)
        }else{
            toast.error('Something went wrong')
        }
    }
    
    console.log(data)
    if(response.status > 300 &&  response.status < 500){
        if(data && data.message){
            toast.error(data.message)
            throw new Error(data)
        }else{
            toast.error('Something went wrong')
        }
    }

    return data
}

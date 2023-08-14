import toast from "react-hot-toast";

interface ErrorResponse {
    message?: string;
}

export async function errorHandler(error: any ){
    if(error.response?.status === 400 || error.response?.status === 500){
        const responseData = error.response.data as ErrorResponse
            if(responseData.message){
                toast.error(responseData.message)        
            }else{
                console.error(error)            
            }
    }else{
        console.error(error)
    }
    
}

'use client'
import styles from "@/styles"
import { verificationEmailState } from "@/app/consts"
import {errorHandler} from "@/helpers/errorHandler"
import { useEffect, useState } from "react"
import { requester } from "@/helpers/requester"


export default function VerifyEmail(request: any) {
   const [token,setToken] = useState(request.searchParams.token)
   const [verificationState,setVerificationState] = useState(verificationEmailState.VERIFYING_TOKEN)
   const generateNewVerificationToken = async ()=>{
      try {
         await requester('/api/users/newVerificationToken', {
            method: "POST",
            body: JSON.stringify({ token })
         })
         setVerificationState(verificationEmailState.SENT_NEW_TOKEN)
      } catch (error: any) {
         await errorHandler(error)
      }
      
   }

   useEffect(() => {
      const verifyUser = async () => {
         try {
            if(token){
               const data = await requester('/api/users/verifyEmail',{
                  method: "POST",
                  body: JSON.stringify({ token })
               })
               if(data.verificationState === verificationEmailState.VERIFIED_TOKEN){
                  setVerificationState( verificationEmailState.VERIFIED_TOKEN )
               }

               if(data.verificationState === verificationEmailState.EXPIRED_TOKEN ){
                  setVerificationState(verificationEmailState.EXPIRED_TOKEN)
               }

               if(data.verificationState === verificationEmailState.WRONG_TOKEN ){
                  setVerificationState(verificationEmailState.WRONG_TOKEN)
               }
            }else{
               setVerificationState(verificationEmailState.NOT_TOKEN)
            }
         } catch (error: any) {
            setVerificationState(verificationEmailState.NOT_TOKEN)
            await errorHandler(error)
         }
      }
      verifyUser()
   }, [token])

   return (<div className={styles.section.default}>
      <h1 className={styles.text.h1}>{(()=>{
         if(verificationState === verificationEmailState.VERIFYING_TOKEN){
            return "verificando..."
         }else if(verificationState === verificationEmailState.VERIFIED_TOKEN){
            return "¡Tu email ha sido verificado con éxito!"
         }else if(verificationState === verificationEmailState.EXPIRED_TOKEN){
            return <div>Tu código de verificación ha expirado, haz <button onClick={generateNewVerificationToken} className="text-forange underline">click aquí</button> para generar un nuevo código de verificación</div>
         }else if(verificationState === verificationEmailState.SENT_NEW_TOKEN){
            return <div>Te acabamos de enviar el código al email.</div>
         }
         else if(verificationState === verificationEmailState.WRONG_TOKEN){
            return "Código de verificación incorrecto"
         }else{
            return "No tienes ningún código de verificación"
         }
      })()}
      </h1>
   </div>)
}
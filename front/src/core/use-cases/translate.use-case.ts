import type { TranslateResponse } from "../../interfaces"


export const translate=async(prompt:string,lang:string)=>{
        try {
        const req=await fetch(`${import.meta.env.VITE_GPT_API}/translate`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({prompt,lang})
        })

        if(!req.ok){
            throw new Error("No se pudo realizar la petición")
        }
        
        const data=await req.json() as  TranslateResponse
    
     
        return {
            ok:true,
            message:data.message
        }
        
    } catch (error) {
        console.log(error)
        return{
            ok:false,
            message:"No se pudo realizar la corrección"
        }
    }
}
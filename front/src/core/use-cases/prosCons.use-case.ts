import type { ProsConsResponse } from "../../interfaces"


export const prosConsCase=async(prompt:string)=>{


    try {
        const req=await fetch(`${import.meta.env.VITE_GPT_API}/pros-cons-discusser`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({prompt})
        })

        if(!req.ok){
            throw new Error("No se pudo realizar la comparación")
        }
        
        const data=await req.json() as ProsConsResponse
    
     
        return {
            ok:true,
            ...data
        }
        
    } catch (error) {
        return{
            ok:false,
            userScore:0,
            errors:[],
            message:"No se pudo realizar la comparación"
        }
    }
}
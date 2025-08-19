import type { OrthographyResponse } from "../../interfaces"

export const orthographyCase=async(prompt:string)=>{


    try {
        const req=await fetch(`${import.meta.env.VITE_GPT_API}/orthography-check`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({prompt})
        })

        if(!req.ok){
            throw new Error("No se pudo realizar la petición")
        }
        
        const data=await req.json() as OrthographyResponse
    
     
        return {
            ok:true,
            ...data
        }
        
    } catch (error) {
        return{
            ok:false,
            userScore:0,
            errors:[],
            message:"No se pudo realizar la corrección"
        }
    }
}
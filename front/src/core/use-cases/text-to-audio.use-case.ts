export const textToAudioCase=async(text:string,selectedVoice:string)=>{


    try {
        const req=await fetch(`${import.meta.env.VITE_GPT_API}/text-to-audio`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                prompt:text,
                voice:selectedVoice
            })
        })

        if(!req.ok){
            throw new Error("No se pudo realizar la petición")
        }
        
       const audioFile=await req.blob()
    const audioUrl=URL.createObjectURL(audioFile)
     
        return {
            ok:true,
            audioUrl,
            message:text
        }
        
    } catch (error) {
        return{
            ok:false,
            message:"No se pudo generar el audio"
        }
    }
}
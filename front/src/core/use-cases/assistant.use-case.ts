interface Options{
    threadId:string|null
    prompt:string
}

interface AssistantResponse{
    threadId:string 
    message:string
}

export async function assistantCase(options: Options) {
  const { threadId, prompt } = options;

  try {
    const url = import.meta.env.VITE_ASSISTANT_API;

    const resp = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        threadId: threadId, 
        prompt
      })
    });

    

    const json = await resp.json() as AssistantResponse 
   
   
    return {
        ok:true,
        message:json.message,
        thread:json.threadId
    }
  } catch (error) {
    console.log(error);
     return {
        ok:false,
        message:"Uy hubo un error,intente nuevamente.",
    }
  }
}

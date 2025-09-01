import { use, useEffect, useState } from "react"
import { GptMessage, MyMessage, TypingLoader, TextMessageBox } from "../../components"
import { assistantCase } from "../../../core/use-cases"

interface Message{
    text:string
    isGtp:boolean
}

export  function AssistantPage() {

    const [isLoading,setIsLoading]=useState(false)
    const [messages,setMessages]=useState<Message[]>([])
    const [threadId,setThreadId]=useState<string>()

    useEffect(()=>{
      let threadId=localStorage.getItem("threadId")
      if(threadId){
     setThreadId(threadId)
      }
    },[])
 
   
    const handlePost=async(text:string)=>{
        if (text.trim().length === 0) return
        
        setIsLoading(true)
        setMessages(prev=>[
            ...prev,{
                text:text,
                isGtp:false
            }
        ])
    
      const {ok,thread,message}=  await assistantCase({
          prompt:text,
          threadId:threadId || null})

              setIsLoading(false)
        if(!ok){
          setMessages(messages=>[
            ...messages,{
              text:message,
              isGtp:true
            }
          ])
        }
        if(ok){
          setThreadId(thread)
          setMessages(messages=>[
            ...messages,
            {
              text:message,
              isGtp:true
            }
          ])
        }
    }

  return (
    <div className="chat-container">
        <div className="chat-messages">
            <div className="grid grid-cols-12 gap-y-2">
                <GptMessage text="Hola,soy tu asistente, en que puedo ayudarte"/>
                {
                    messages.map((message,index)=>(
                        message.isGtp ?(
                            <GptMessage key={index} text={message.text}/>
                        ) : 
                            <MyMessage key={index} text={message.text} />   
                    ))
                }
                {
                    isLoading && (
                        <div className="col-start-1 col-end-12 fade-in">
                            <TypingLoader className="fade-in"/>
                        </div>
                    )
                }
            </div>
        </div>

        <div className="mt-4">
            <TextMessageBox 
                onSendMessage={handlePost}
                placeholder="Escribe tu texto para revisar ortografía..."
                disableCorrections={true}
            />
        </div>
    </div>
  )
}

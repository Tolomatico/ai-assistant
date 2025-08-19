import { useState } from "react"
import { GptMessage, MyMessage, TypingLoader, TextMessageBox } from "../components"

interface Message{
    text:string
    isGtp:boolean
}

export  function ChatTemplate() {

    const [isLoading,setIsLoading]=useState(false)
    const [messages,setMessages]=useState<Message[]>([])

    const handlePost=async(text:string)=>{
        if (text.trim().length === 0) return
        
        setIsLoading(true)
        setMessages(prev=>[
            ...prev,{
                text:text,
                isGtp:false
            }
        ])
        setIsLoading(false)
   
    }

  return (
    <div className="chat-container">
        <div className="chat-messages">
            <div className="grid grid-cols-12 gap-y-2">
                <GptMessage text="Hola, puedes escribir tu texto en español, y te ayudo con las correcciones ortográficas"/>
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

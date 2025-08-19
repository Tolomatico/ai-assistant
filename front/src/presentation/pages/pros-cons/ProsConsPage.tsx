import { useState } from "react"
import { GptMessage, MyMessage, TypingLoader, TextMessageBox } from "../../components"
import { prosConsCase } from "../../../core/use-cases"

interface Message{
    text:string
    isGtp:boolean
}

export  function ProsConsPage () {

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
           const result = await prosConsCase(text)
        if(!result.ok){
               setMessages(prev=>[
            ...prev,{
                text:"No se pudo realizar la comparación",
                isGtp:true
            }
        ])      
        } else if ('content' in result) {
         setMessages(prev=>[
            ...prev,{
                text:result.content,
                isGtp:true,
               
            }
        ])
        }
     
   setIsLoading(false)
   
    }

  return (
    <div className="chat-container">
        <div className="chat-messages">
            <div className="grid grid-cols-12 gap-y-2">
                <GptMessage text="Escribe lo que sea que quieres que compare..."/>
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
                placeholder="Escribe el texto a comparar..."
                disableCorrections={true}
            />
        </div>
    </div>
  )
}

import { useRef, useState } from "react"
import { GptMessage, MyMessage, TypingLoader, TextMessageBox } from "../../components"
import {  prosConsStreamGeneratorCase } from "../../../core/use-cases"


interface Message{
    text:string
    isGtp:boolean
}

export  function ProsConsStreamPage() {
  const abortController=useRef(new AbortController())
  const isRunning=useRef(false)
    const [isLoading,setIsLoading]=useState(false)
    const [messages,setMessages]=useState<Message[]>([])

  
    const handlePost=async(text:string)=>{
        if (text.trim().length === 0) return
        if(isRunning.current){
  abortController.current.abort()
  abortController.current=new AbortController()
        }
      
        setIsLoading(true)
      isRunning.current=true
       
        setMessages(prev=>[
            ...prev,{
                text:text,
                isGtp:false
            }
        ])

        const stream=  prosConsStreamGeneratorCase(text,abortController.current.signal)
      setIsLoading(false)


        setMessages((messages)=>[
          ...messages,{
              text:"",
              isGtp:true
          }
        ])

        for await(const text of stream){
            setMessages((messages)=>{
           const newMessages=[...messages]
           newMessages[newMessages.length - 1].text=text
           return newMessages
        })
        }

      //  const reader= await prosConsStreamCase(text)  
      //   setIsLoading(false)
      //   if(!reader)return
      //     const decoder=new TextDecoder()
      //    let message=""
  
      //   setMessages((messages)=>[
      //     ...messages,{
      //         text:message,
      //         isGtp:true
      //     }
      //   ])
      //   while(true){
      //     const {value,done}=await reader.read()
      //     if(done)break
      //     const decodedChunk=decoder.decode(value,{stream:true})
      //     message+=decodedChunk
      //     setMessages((messages)=>{
      //     const newMessages=[...messages]
      //     newMessages[newMessages.length - 1].text=message
      //     return newMessages
      //   })
      //   }
        


    }

  return (
    <div className="chat-container">
        <div className="chat-messages">
            <div className="grid grid-cols-12 gap-y-2">
                <GptMessage text="Que deseas comparar?"/>
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

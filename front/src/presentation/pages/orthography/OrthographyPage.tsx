import { useState } from "react";
import { GptMessage, GptOrthographyMessage, MyMessage, TextMessageBox, TypingLoader } from "../../components";
import { orthographyCase } from "../../../core/use-cases";

interface Message{
    text:string
    isGtp:boolean
    info?:{
        userScore:number
        errors:string[]
        message:string
    }
}

export  function OrthographyPage() {

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

     const {ok,errors,message,userScore}= await orthographyCase(text)
        if(!ok){
               setMessages(prev=>[
            ...prev,{
                text:"No se pudo realizar la corrección",
                isGtp:true
            }
        ])      
        }

         setMessages(prev=>[
            ...prev,{
                text:message,
                isGtp:true,
                info:{errors,message,userScore}
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
                            <GptOrthographyMessage 
                                key={index}
                             {...message.info!}
                             />
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
           {/* <div className="mt-4">
            <TextMessageBoxFile 
                onSendMessage={handlePost}
                placeholder="Escribe tu texto para revisar ortografía..."
            />
        </div> */}
        {/* <div className="mt-4">
            <TextMessageBoxSelect
                onSendMessage={handlePost}
                placeholder="Escribe tu texto para revisar ortografía..."
                options={[{id:"1",text:"Hola"},{id:"2",text:"Mundo"}]}
          />
        </div> */}
    </div>
  )
}

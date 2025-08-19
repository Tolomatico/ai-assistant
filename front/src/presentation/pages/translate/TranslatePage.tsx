import { useState } from "react"
import { GptMessage, MyMessage, TypingLoader, TextMessageBox, TextMessageBoxSelect } from "../../components"
import { prosConsCase, translate } from "../../../core/use-cases"

interface Message{
    text:string
    isGtp:boolean
}
const languages = [
  { id: "alemán", text: "Alemán" },
  { id: "árabe", text: "Árabe" },
  { id: "bengalí", text: "Bengalí" },
  { id: "francés", text: "Francés" },
  { id: "hindi", text: "Hindi" },
  { id: "inglés", text: "Inglés" },
  { id: "japonés", text: "Japonés" },
  { id: "mandarín", text: "Mandarín" },
  { id: "portugués", text: "Portugués" },
  { id: "ruso", text: "Ruso" },
];

export  function TranslatePage () {

    const [isLoading,setIsLoading]=useState(false)
    const [messages,setMessages]=useState<Message[]>([])

    const handlePost=async(text:string,selectedOption:string)=>{
        if (text.trim().length === 0) return
        
        setIsLoading(true)

        const newMessage=`Traduce:"${text}" al idioma ${selectedOption}`


        setMessages(prev=>[
            ...prev,{
                text:newMessage,
                isGtp:false
            }
        ])
           const {ok,message} = await translate(text,selectedOption)
        if(!ok){
               setMessages(prev=>[
            ...prev,{
                text:"No se pudo realizar la traducción",
                isGtp:true
            }
        ])      
        } else if (message) {
         setMessages(prev=>[
            ...prev,{
                text:message,
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
            <TextMessageBoxSelect
                options={languages} 
                onSendMessage={handlePost}
                placeholder="Escribe el texto a traducir..."
                disableCorrections={true}
            />
        </div>
    </div>
  )
}

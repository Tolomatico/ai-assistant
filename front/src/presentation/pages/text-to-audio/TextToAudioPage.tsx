import { useState } from "react"
import { GptMessage, MyMessage, TypingLoader, TextMessageBoxSelect, GptMessageAudio } from "../../components"
import { textToAudioCase } from "../../../core/use-cases";

interface TextMessage{
    text:string
    isGpt:boolean
    type:"text"
}

interface AudioMessage{
  text:string 
  isGpt:boolean 
  audio:string 
  type:"audio"
}

type Message= TextMessage | AudioMessage

const voicesArray = [
  { text: "Rachel", id: "21m00Tcm4TlvDq8ikWAM" },
  { text: "Clyde", id: "2EiwWnXFnvU5JabPnv8n" },
  { text: "Aria", id: "9BWtsMINqrJLrRacOk9x" },
  { text: "Roger", id: "CwhRBWXzGAHq8TQ4Fs17" },
  { text: "Sarah", id: "EXAVITQu4vr4xnSDxMaL" },
  { text: "Laura", id: "FGY2WhTYpPnrIDTdsKH5" },
  { text: "Thomas", id: "GBv7mTt0atIp3Br8iCZE" },
  { text: "Charlie", id: "IKne3meq5aSn9XLyUdCD" },
  { text: "George", id: "JBFqnCBsd6RMkjVDRZzb" },
  { text: "Callum", id: "N2lVS1w4EtoT3dr4eOWO" },
  { text: "River", id: "SAz9YHcvj6GT2YYXdXww" },
  { text: "Harry", id: "SOYHLrjzK2X1ezoPC6cr" },
  { text: "Liam", id: "TX3LPaxmHKxFdv7VOQHJ" },
  { text: "Charlotte", id: "XB0fDUnXU5powFXDhCwa" },
  { text: "Alice", id: "Xb7hH8MSUJpSbSDYk0k2" },
  { text: "Matilda", id: "XrExE9yKIg1WjnnlVkGX" },
  { text: "Will", id: "bIHbv24MWmeRgasZH58o" },
  { text: "Jessica", id: "cgSgspJ2msm6clMCkdW9" },
  { text: "Eric", id: "cjVigY5qzO86Huf0OWal" },
  { text: "Chris", id: "iP95p4xoKVk53GoZ742B" },
  { text: "Brian", id: "nPczCjzI2devNBz1zQrb" },
  { text: "Daniel", id: "onwK4e9ZLuTAKqWW03F9" },
  { text: "Lily", id: "pFZP5JQG7iQjIQuC4Bku" },
  { text: "Bill", id: "pqHfZKP75CvOlQylNhV4" }
];


export  function TextToAudioPage() {

    const [isLoading,setIsLoading]=useState(false)
    const [messages,setMessages]=useState<Message[]>([])

    const handlePost=async(text:string,selectedVoice:string)=>{
        if (text.trim().length === 0) return
        
        setIsLoading(true)
        setMessages(prev=>[
            ...prev,{
                text:text,
                isGpt:false,
                type:"text"
            }
        ])
       const {ok,message,audioUrl}= await textToAudioCase(text,selectedVoice)
        if(!ok){
           setMessages(prev=>[
            ...prev,{
                text:"hubo un error al generar el audio",
                isGpt:true,
                type:"text"
            }
        ])
        }
        setMessages((prev)=>[
          ...prev,{
            text:`Transformando a audio: "${message}"`,
            isGpt:true,
            type:"audio",
            audio:audioUrl!
          }
        ])
        setIsLoading(false)
   
    }

  return (
    <div className="chat-container">
        <div className="chat-messages">
            <div className="grid grid-cols-12 gap-y-2">
                <GptMessage text="Escribe el texto que quieres transformar a audio"/>
                {
                    messages.map((message,index)=>(
                        message.isGpt  ?( 

                          message.type=== "audio" ? (
 <GptMessageAudio audio={message.audio} key={index} text={message.text}/>
                          ):<GptMessage key={index} text={message.text}/>
                           
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
              onSendMessage={handlePost}
              options={voicesArray}      
            />
        </div>
    </div>
  )
}

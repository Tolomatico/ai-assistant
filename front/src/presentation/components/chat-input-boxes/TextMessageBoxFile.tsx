import type { FormEvent } from "react"
import { useState,useRef } from "react"

interface Props{
    onSendMessage:(message:string)=>void
    placeholder?:string
    disableCorrections?:boolean
    accept?:string
}

export const TextMessageBoxFile = ({accept,onSendMessage,placeholder,disableCorrections=false}:Props)=> {
 
    const [message, setMessage] = useState('')
    const [selectedFile,setSelectedFile]=useState<File | null | undefined>(null)

    const inputFileRef=useRef<HTMLInputElement>(null)

    const handleSendMessage=(event:FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        
        if (message.trim().length === 0) return
        
        onSendMessage(message)
        setMessage('')
    }
 console.log(selectedFile)
    return (
        <form 
            onSubmit={handleSendMessage}
            className="flex flex-row items-center h-16 rounded-xl bg-white/10 backdrop-blur-sm w-full px-4 border border-white/20"
        >
            <div className="mr-3">
                <button
                type="button"
                onClick={()=>inputFileRef.current?.click()}
                className="flex items-center justify-center text-gray-400 hover:text-gray-200">
                    <i className="fa-solid fa-paperclip text-xl"></i>
               
                </button>
                <input
                 type="file"
                 ref={inputFileRef}
                 accept={accept} 
                 hidden
                 onChange={e=>setSelectedFile(e.target.files?.item(0))}/>
            </div>
            <div className="flex flex-row items-center w-full gap-4">
                <div className="flex-1">
                    <input
                        autoFocus
                        name="message"
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={placeholder || "Escribe tu mensaje aquí..."}
                        className="w-full h-10 px-4 rounded-xl text-gray-800 bg-white/90 backdrop-blur-sm border border-white/30 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 transition-all duration-200"
                        autoComplete={disableCorrections ? "on":"off"}
                        autoCorrect={disableCorrections ? "on":"off"}
                        spellCheck={disableCorrections ?"true":"false"}
                    />
                </div>
                <div>
                    <button 
                        type="submit"
                        disabled={ !selectedFile}
                        className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {
                            !selectedFile ?(
                              <span>Enviar</span> ):
                              (  <span>{selectedFile.name.substring(0,15)+"..."}</span>)

                        }

                      
                        <i className="fa-regular fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </form>
    )
}

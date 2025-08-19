import type { FormEvent } from "react"
import { useState } from "react"

interface Props{
    onSendMessage:(message:string)=>void
    placeholder?:string
    disableCorrections?:boolean
}

export const TextMessageBox = ({onSendMessage,placeholder,disableCorrections=false}:Props)=> {
 
    const [message, setMessage] = useState('')

    const handleSendMessage=(event:FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        
        if (message.trim().length === 0) return
        
        onSendMessage(message)
        setMessage('')
    }
 
    return (
        <form 
            onSubmit={handleSendMessage}
            className="flex flex-row items-center h-16 rounded-xl bg-white/10 backdrop-blur-sm w-full px-4 border border-white/20"
        >
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
                        disabled={message.trim().length === 0}
                        className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        <span>Enviar</span>
                        <i className="fa-regular fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </form>
    )
}

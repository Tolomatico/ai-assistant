import type { FormEvent } from "react"
import { useState } from "react"

interface Props {
    onSendMessage: (message: string,option:string) => void
    placeholder?: string
    disableCorrections?: boolean
    options: Option[]
}

interface Option {
    id: string 
    text: string
}

export const TextMessageBoxSelect = ({ onSendMessage, placeholder, disableCorrections = false, options }: Props) => {
    const [message, setMessage] = useState('')
    const [selectedOption, setSelectedOption] = useState('')

    const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        
        if (message.trim().length === 0) return
        if (selectedOption === "") return
        
        onSendMessage(message,selectedOption)
        setMessage('')
    }

    return (
        <form 
            onSubmit={handleSendMessage}
            className="flex flex-col gap-3 p-4 rounded-xl bg-white/10 backdrop-blur-sm w-full border border-white/20"
        >
            <div className="flex flex-col sm:flex-row gap-3 w-full">
                <div className="flex-1">
                    <input
                        autoFocus
                        name="message"
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={placeholder || "Escribe tu mensaje aquí..."}
                        className="w-full h-12 px-4 rounded-xl text-gray-800 bg-white/90 backdrop-blur-sm border border-white/30 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 transition-all duration-200"
                        autoComplete={disableCorrections ? "on" : "off"}
                        autoCorrect={disableCorrections ? "on" : "off"}
                        spellCheck={disableCorrections ? "true" : "false"}
                    />
                </div>
                
                <div className="w-full sm:w-48">
                    <select
                        name="select"
                        value={selectedOption}
                        onChange={(e) => setSelectedOption(e.target.value)}
                        className="w-full h-12 px-4 rounded-xl text-gray-800 bg-white/90 backdrop-blur-sm border border-white/30 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 transition-all duration-200"
                    >
                        <option value="">Selecciona una opción</option>
                        {options.map(({ id, text }) => (
                            <option key={id} value={id}>
                                {text}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            
            <div className="flex justify-end">
                <button 
                    type="submit"
                    disabled={message.trim().length === 0}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-all duration-200"
                >
                    <span>Enviar</span>
                    <i className="fa-regular fa-paper-plane"></i>
                </button>
            </div>
        </form>
    )
}

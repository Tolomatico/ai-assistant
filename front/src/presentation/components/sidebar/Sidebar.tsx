import { Navigation } from "../navigation/Navigation";

interface Props{
  openSidebar:boolean 
  setOpenSidebar:()=>void
}

export  function Sidebar({openSidebar,setOpenSidebar}:Props) {


  return (
    <div className="flex h-fit ">
      {/* Sidebar */}
      <div className={`${openSidebar ? "w-24" : "w-64"} bg-gray-800 shadow-lg  border-gray-700 rounded-lg`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center p-6 border-b border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-indigo-400 rounded-lg flex items-center justify-center">
               GPT
              </div>
              {
                <span className={`text-xl font-bold text-white transition-all duration-1000 ${openSidebar ? 'hidden ' : 'flex'}`}>
                  Integraciones con IA
                </span>
              }
            </div>
          </div>
          
          {/* Botón de toggle */}
          <button
            onClick={setOpenSidebar}
            className="cursor-pointer p-2 mx-auto mb-4">
            <i className="fa-solid fa-bars"></i>
          </button>
      
          
             <Navigation openSidebar={openSidebar}/>
        </div>
      </div>
    
 
    </div>
  )
}

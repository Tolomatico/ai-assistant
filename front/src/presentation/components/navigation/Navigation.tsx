import { Link, useLocation } from "react-router";
import { menuRoutes } from "../../router/router";

interface Props{
  openSidebar:boolean
}

export function Navigation({openSidebar}:Props) {
       const location = useLocation();
  return (
    <nav className="flex-1 px-4 py-6 space-y-2">
            {menuRoutes.map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive 
                      ? "bg-indigo-500 text-white border-r-2 border-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  <i className={`${item.icon} w-5 h-5 text-indigo-400`}></i>
                  {
                    !openSidebar &&<span className="font-medium">{ item.title}</span>
                  }
                </Link>
              );
            })}
          </nav>)
}

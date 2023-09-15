import { Outlet } from "react-router-dom";
import Nabvar from "../components/navbar/Nabvar";
import { UserCircleIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import { UserContextProvider } from "../context/context_index";

const Private_layout = () => {
    return (
        <UserContextProvider>
            <header>
                <div className="tex-black flex top-0 right-0 w-full  justify-end p-4 gap-8">
                    <input type="search" placeholder="Search" className="w-1/4 rounded-lg p-1 pl-4 focus:outline-none" />
                    <p className="flex gap-2 text-indigo-500">
                        <span><UserCircleIcon className='h-6 w-6'/></span>
                        <span>William Carvajal</span>
                        <span><ChevronDownIcon className='h-6 w-6'/></span>
                    </p>
                </div>
                <Nabvar />
            </header>
   
            <Outlet />
        </UserContextProvider>

       
    );
};

export default Private_layout;

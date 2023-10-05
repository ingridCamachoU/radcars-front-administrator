import { Outlet } from "react-router-dom";
import { useContext, useState } from "react";
import Nabvar from "../components/navbar/Nabvar";
import { UserContextProvider } from "../context/context_index";
import Header_page from "../components/header/Header_page";
import { DarkMode } from "../context/DarkMode";

const Private_layout = () => {

    const [isOpenMenu, setIsOpenMenu] = useState(false);

    const {darkMode} = useContext(DarkMode); 

    return (
        <UserContextProvider>
            <div className={darkMode ? `body dark` : `body light`}>
                <header> 
                    <Header_page setIsOpenMenu={setIsOpenMenu}/>
                    <span 
                        className={
                            `${isOpenMenu 
                                ? 'flex flex-col top-0 items-center justify-center z-40 w-full min-h-screen overflow-auto fixed lg:hidden'
                                : 'hidden'
                            } ${darkMode 
                                ? 'bg-background-dark_medium'
                                : 'bg-white'
                            }`
                        }>
                
                        <Nabvar isOpenMenu={isOpenMenu} setIsOpenMenu={setIsOpenMenu}/>
                    </span> 
                    <Nabvar />
                </header>
    
                <Outlet />
            </div>
            
        </UserContextProvider>
    );
};

export default Private_layout;

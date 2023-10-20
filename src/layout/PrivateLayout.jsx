import { Outlet } from "react-router-dom";
import { useContext, useState } from "react";
import Nabvar from "../components/navbar/Nabvar";
import { DarkMode } from "../context/DarkMode";
import Header from "../components/header/Header";

const PrivateLayout = () => {

    const [isOpenMenu, setIsOpenMenu] = useState(false);

    const {darkMode} = useContext(DarkMode); 

    return (

        <div className={darkMode ? `body dark` : `body light`}>
            <header> 
                <Header setIsOpenMenu={setIsOpenMenu}/>
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
    );
};

export default PrivateLayout;

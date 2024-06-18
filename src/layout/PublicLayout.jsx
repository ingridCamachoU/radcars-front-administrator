import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { DarkMode } from "../context/DarkMode";

const PublicLayout = () => {
    const {darkMode} = useContext(DarkMode); 
    return (
        <div className={darkMode ? `body dark` : `body light`}>  
            <Outlet />      
        </div>
    );
}

export default PublicLayout;

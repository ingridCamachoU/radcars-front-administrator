import { createContext, useState } from "react";

const DarkMode= createContext();

function DarkModeProvider(props){
    const [darkMode, setDarkMode]= useState(false);
    const toggleDarkMode = (dark) =>{
        setDarkMode(!darkMode);
    };
    return(
        <div>
            <DarkMode.Provider value={{darkMode, toggleDarkMode}}>
                {props.children}
            </DarkMode.Provider>
        </div>
    )
};

export {DarkMode, DarkModeProvider};

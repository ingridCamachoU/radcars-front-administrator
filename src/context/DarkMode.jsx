import { createContext, useState } from "react";
import { endPoints } from "../services/endPoints/endPoints";

const DarkMode= createContext();

function DarkModeProvider(props){
    const [darkMode, setDarkMode]= useState(false);
    const toggleDarkMode = (dark) =>{
        setDarkMode(!darkMode);
    };

    // Get products by title //
    const [searchByTitle, setSearchByTitle ] = useState('');

    return(
        <div>
            <DarkMode.Provider value={{darkMode, toggleDarkMode, searchByTitle, setSearchByTitle}}>
                {props.children}
            </DarkMode.Provider>
        </div>
    )
};

export {DarkMode, DarkModeProvider};

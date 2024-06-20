import { createContext, useEffect, useState } from "react";

const DarkMode= createContext();

function DarkModeProvider(props){
    const [darkMode, setDarkMode]= useState(() => {
        const savedDarkMode = localStorage.getItem('darkModeRadCars');
        return savedDarkMode !== null ? JSON.parse(savedDarkMode) : false;
    });
    const toggleDarkMode = (dark) =>{
        setDarkMode(prevMode => {
            const newMode = !prevMode;
            localStorage.setItem('darkModeRadCars', JSON.stringify(newMode));
            return newMode;
        });
    };

    // Get products by title //
    const [searchByTitle, setSearchByTitle ] = useState('');

    //--user--//
    const [user, setUser] = useState(false);
    const [token, setToken] = useState(false);

    const saveToken = (token) => {
        const expiration = new Date();
        expiration.setTime(expiration.getTime() + 2 * 60 * 60 * 1000);
        localStorage.setItem('tokenRadAdmin', token);
        localStorage.setItem('tokenExpirationRadAdmin', expiration.getTime());
    };

    useEffect(() => {
        const storedToken = localStorage.getItem('tokenRadAdmin');
        const expiration = localStorage.getItem('tokenExpirationRadAdmin');
        const currentTime = new Date().getTime();

        if (storedToken && expiration && currentTime < parseInt(expiration)) {
            setUser(JSON.parse(localStorage.getItem('userRadAdmin')));
            setToken(storedToken);
        } else {
            // Token expirado, limpiar el localStorage
            localStorage.removeItem('tokenRadAdmin');
            localStorage.removeItem('tokenExpirationRadAdmin');
            localStorage.removeItem('userRadAdmin');
        }
    }, [token]);
    return(
        <div>
            <DarkMode.Provider value={{
                darkMode, 
                toggleDarkMode, 
                searchByTitle, 
                setSearchByTitle, 
                user,
                setUser,
                saveToken,
                token,
                setToken}}>
                {props.children}
            </DarkMode.Provider>
        </div>
    )
};

export {DarkMode, DarkModeProvider};

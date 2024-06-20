import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { UserCircleIcon, ChevronDownIcon, Bars3Icon, MoonIcon, ArrowRightOnRectangleIcon, SunIcon } from '@heroicons/react/24/solid';
import { DarkMode } from '../../context/DarkMode';
import logoWhite from '../../assets/logo.svg'
import logoBlack from '../../assets/logoBlack.svg'

// eslint-disable-next-line react/prop-types
const Header = ({setIsOpenMenu}) => {

    const { darkMode, toggleDarkMode, setSearchByTitle, searchByTitle, setUser, setToken, user } = useContext(DarkMode);
    const [openToogle, setOpenToogle] = useState(false);
    
    const handleClick = () => {
        toggleDarkMode();
        setOpenToogle(false);
    };

    const openMenu = () => {
        setIsOpenMenu(true);
    };

    const menuOpenToogle = (isOpen) => {
        setOpenToogle(isOpen);
    };
    
    const handleLogout = async () => {
        try {
            setUser(false);
            setToken(false);
            localStorage.removeItem('tokenRadAdmin');
            localStorage.removeItem('userRadAdmin');
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    const navigate = useNavigate();
    
    useEffect(() => {
        if(searchByTitle === ''){
            setSearchByTitle('');
        }else{
            navigate('');
        }
    }, [searchByTitle]);

    return (
        <>
            <div 
                className="tex-black flex top-0 right-0 w-full lg:justify-end p-4 gap-8 justify-between">
                <p className="flex lg:hidden w-[100px] h-[40px]">        
                    {
                        darkMode ? 
                            <img src={logoWhite} alt="logo" />  
                            :
                            <img src={logoBlack} alt="logo" />  
                    }     
                </p>
                    
                <div 
                    className={`${darkMode ? 'flex gap-2 sm:gap-6 text-text-ligth sm:flex-row flex-col w-9/12  justify-end': 'flex gap-2 sm:gap-6 text-text-blue sm:flex-row flex-col w-9/12 justify-end'}`}>
                    <input 
                        type="search" 
                        placeholder="Search" 
                        onChange={(e) => setSearchByTitle(e.target.value)}
                        className="rounded-lg p-1 pl-4 sm:w-6/12 w-full border text-black" />
                    <div className="flex justify-end items-center">
                        <span>
                            <UserCircleIcon className='h-6 w-6'/>
                        </span>
                        <span>{user.name}</span>
                        <div 
                            onMouseEnter={() => menuOpenToogle(true)}
                            onMouseLeave={() => menuOpenToogle(false)}
                            className="relative flex justify-center items-end pl-2 pr-4 cursor-pointer hover:h-6 flex-col  hover:text-text-blue"
                        >
                            <ChevronDownIcon className='h-4 w-4' />
                            <div className={`${openToogle ? 'block' : 'hidden'} absolute mt-20 w-20 bg-white shadow-lg rounded-md`}>
                                <ul className='w-full flex flex-col'>
                                    <li onClick={handleClick} className="p-2 hover:bg-gray-200 cursor-pointer w-full items-center flex justify-center hover:rounded-md">
                                        {darkMode ? <SunIcon className='h-6 w-6 text-text-blue' /> : <MoonIcon className='h-6 w-6 text-text-blue' />}
                                    </li>
                                    <li onClick={handleLogout} className="p-2 hover:bg-gray-200 cursor-pointer w-full items-center flex justify-center hover:rounded-md">
                                        <ArrowRightOnRectangleIcon className='h-6 w-6 text-text-blue' />
                                    </li>
                                </ul>
                            </div>
                        </div> 
                        <span 
                            onClick={openMenu}
                            className={`${darkMode ? 'flex justify-center items-center lg:hidden cursor-pointer hover:text-text-blue': 'flex justify-center items-center lg:hidden cursor-pointer hover:text-gray-300'}`}>
                            <Bars3Icon className='h-8 w-8'/>
                        </span>          
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;

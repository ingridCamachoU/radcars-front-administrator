import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { UserCircleIcon, ChevronDownIcon, Bars3Icon, MoonIcon, ArrowRightOnRectangleIcon, SunIcon } from '@heroicons/react/24/solid';
import { useUSerContext } from '../../context/context_index';
import { DarkMode } from '../../context/DarkMode';
import logo from '../../assets/logo.png'

// eslint-disable-next-line react/prop-types
const Header_page = ({setIsOpenMenu}) => {

    const {darkMode, toggleDarkMode} = useContext(DarkMode);
    const [openToogle, setOpenToogle] = useState(false);
    
    const handleClick = () => {
        toggleDarkMode();
        setOpenToogle(false);
    };

    const openMenu = () => {
        setIsOpenMenu(true);
    };

    const navigate = useNavigate();
    const searchProduct = () => {
        navigate('');
    };

    const menuOpenToogle = () => {
        openToogle ? setOpenToogle(false) : setOpenToogle(true);
    };
    const {setSearchByTitle} = useUSerContext();

    return (
        <>
            <div 
                className="tex-black flex top-0 right-0 w-full lg:justify-end p-4 gap-8 justify-between">
                <p className="flex lg:hidden w-[100px] h-[40px]">        
                    <img src={logo} alt="logo" />       
                </p>
                    
                <div 
                    className="flex gap-2 sm:gap-6 text-indigo-500 sm:flex-row flex-col w-9/12  justify-end">
                    <input 
                        type="search" 
                        placeholder="Search" 
                        onChange={(e) => setSearchByTitle(e.target.value)}
                        onClick={searchProduct}
                        className="rounded-lg p-1 pl-4 focus:outline-none sm:w-6/12 w-full" />
                    <p className="flex justify-end items-center">
                        <span>
                            <UserCircleIcon className='h-6 w-6'/>
                        </span>
                        <span>William Carvajal</span>
                        <span 
                            onClick={menuOpenToogle}
                            className="flex justify-center items-end pl-2 pr-4 cursor-pointer hover:h-6">
                            <ChevronDownIcon className='h-4 w-4'/>
                        </span>  
                        <span 
                            className={`${openToogle ? 'w-12 h-22 gap-2 bg-indigo-100 p-2 border border-indigo-500 justify-center items-center rounded-lg flex flex-col absolute lg:top-10 lg:right-2 md:top-11 md:right-10 sm:top-11 sm:right-10 top-20 right-10' : "hidden" }`}    
                        >   
                            <span onClick={handleClick}>
                                {darkMode 
                                    ? <SunIcon  className='h-6 w-6 white text-indigo-500 cursor-pointer'/> 
                                    : <MoonIcon  className='h-6 w-6 white text-indigo-500 cursor-pointer'/> 
                                } 
                            </span>
                            
                            <ArrowRightOnRectangleIcon  className='h-6 w-6 text-indigo-500'/>
                        </span>  
                        <span 
                            onClick={openMenu}
                            className="flex justify-center items-center lg:hidden  cursor-pointer" >
                            <Bars3Icon className='h-8 w-8 '/>
                        </span>          
                    </p>
                </div>
            </div>
        </>
    );
}

export default Header_page;

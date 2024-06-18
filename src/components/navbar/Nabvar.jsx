import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UsersIcon, DocumentPlusIcon, RectangleGroupIcon, TruckIcon, CircleStackIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { DarkMode } from '../../context/DarkMode';
import logo from '../../assets/logo.svg';
import logoBlack from '../../assets/logoBlack.svg'

const Nabvar = ({ isOpenMenu, setIsOpenMenu }) => {

    const closeMenu = () => {
        isOpenMenu ? setIsOpenMenu(false) : null;
    };

    const {darkMode} = useContext(DarkMode);

    const activesStyle = darkMode 
        ? 'text-text-ligth flex gap-2 bg-[#1E1E28] p-2 rounded' 
        : 'text-text-blue flex gap-2 bg-[#F4F5F9] p-2 rounded';
    const disabledStyle = 'flex gap-2 p-2';

    return (
        <nav className={`${isOpenMenu ? `flex flex-col items-center pt-8 w-full text-xl min-h-screen ${darkMode ? 'text-text-ligth' : 'text-text-dark'}` : `top-0 left-0 lg:flex flex-col items-center w-[180px] bg-btn-style fixed min-h-screen p-2 hidden ${darkMode ? 'text-text-ligth' : 'text-text-ligth'}`}`}
        >
            <span className={
                `${isOpenMenu 
                    ? 'top-6 right-10 cursor-pointer absolute' 
                    : "hidden" 
                }`}>
                <XMarkIcon 
                    onClick={closeMenu}
                    className={`${darkMode ? 'h8 w-8 text-white mt-8': 'h8 w-8  text-text-dark mt-8'}`}/>
            </span>
            <div className='w-[117px] m-4'>
                {
                    isOpenMenu && !darkMode ?
                        <img src={logoBlack} alt="logo" />    
                        :  <img src={logo} alt="logo" />    
                }
                
            </div>

            <ul className='flex flex-col gap-12 mt-8 w-11/12 ml-9'>
                <li>
                    <NavLink 
                        to='users'
                        onClick={closeMenu}
                        className={ ({isActive}) =>
                            isActive 
                                ? activesStyle 
                                : disabledStyle
                        }> 
                        <UsersIcon className='h-6 w-6'/> 
                        Clientes
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to='others'
                        onClick={closeMenu}
                        className={({isActive}) =>
                            isActive 
                                ? activesStyle 
                                : disabledStyle
                        }> 
                        <CircleStackIcon className='h-6 w-6'/>
                        Otros
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to='/'
                        onClick={closeMenu}
                        className={({isActive}) =>
                            isActive 
                                ? activesStyle 
                                : disabledStyle
                        }> 
                        <RectangleGroupIcon className='h-6 w-6'/>
                        Productos
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to='providers'
                        onClick={closeMenu}
                        className={({isActive}) =>
                            isActive 
                                ? activesStyle 
                                : disabledStyle
                        }>
                        <TruckIcon className='h-6 w-6'/>
                        Proveedores
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to='tasks'
                        onClick={closeMenu}
                        className={({isActive}) =>
                            isActive 
                                ? activesStyle 
                                : disabledStyle
                        }> 
                        <DocumentPlusIcon className='h-6 w-6'/>
                        Tareas
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
};

export default Nabvar;

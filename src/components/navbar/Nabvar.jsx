import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { UsersIcon, DocumentPlusIcon, RectangleGroupIcon, TruckIcon, CircleStackIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useContext } from 'react';
import { DarkMode } from '../../context/DarkMode';

const Nabvar = ({isOpenMenu, setIsOpenMenu}) => {

    const closeMenu = () => {
        isOpenMenu ? setIsOpenMenu(false) : null;
    };

    const {darkMode} = useContext(DarkMode);

    const activesStyle = 'text-indigo-500 flex gap-2 underline';
    const disabledStyle = 'flex gap-2';

    return (
        <nav className={`${isOpenMenu  ? 'flex flex-col items-center pt-8 w-full text-xl min-h-screen' : `${darkMode ? 'top-0 lef-0 lg:flex flex-col items-center w-[208px] bg-[#212130] fixed min-h-screen p-2 hidden' : 'top-0 lef-0 lg:flex flex-col items-center w-[208px] bg-[#FFFFFF] fixed min-h-screen p-2 hidden'}` }`}
        >
            <span className={`${isOpenMenu ? 'top-6 right-10 cursor-pointer absolute' : "hidden" }`}>
                <XMarkIcon 
                onClick={closeMenu}
                className="h8 w-8 text-gray-500"/>
            </span>
           <div className='w-[117px] m-4'>
                <img src={logo} alt="logo" />     
           </div>

           <ul className='flex flex-col gap-12 mt-8 text-gray-500'>
                <li>
                    <NavLink 
                    to='users'
                    className={({isActive}) =>
                    isActive ? activesStyle : disabledStyle}
                    onClick={closeMenu}
                    > 
                    <UsersIcon className='h-6 w-6'/> Clientes</NavLink>
                </li>
                <li>
                    <NavLink 
                    to='others'
                    onClick={closeMenu}
                    className={({isActive}) =>
                    isActive ? activesStyle : disabledStyle}> <CircleStackIcon className='h-6 w-6'/>Otros</NavLink>
                </li>
                <li>
                    <NavLink 
                    to=''
                    onClick={closeMenu}
                    className={({isActive}) =>
                    isActive ? activesStyle : disabledStyle}> <RectangleGroupIcon className='h-6 w-6'/>Productos</NavLink>
                </li>
                <li>
                    <NavLink 
                    to='providers'
                    onClick={closeMenu}
                    className={({isActive}) =>
                    isActive ? activesStyle : disabledStyle}> <TruckIcon className='h-6 w-6'/>Proveedores</NavLink>
                </li>
                <li>
                    <NavLink 
                    to='tasks'
                    onClick={closeMenu}
                    className={({isActive}) =>
                    isActive ? activesStyle : disabledStyle}> <DocumentPlusIcon className='h-6 w-6'/>Tareas</NavLink>
                </li>
           </ul>
        </nav>
    )
};

export default Nabvar;

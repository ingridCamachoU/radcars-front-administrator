import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { UsersIcon, DocumentPlusIcon, RectangleGroupIcon, TruckIcon, CircleStackIcon } from '@heroicons/react/24/solid';

const Nabvar = () => {

    const activesStyle = 'text-indigo-500 flex gap-2 underline';
    const disabledStyle = 'flex gap-2';
    return (
        <nav className="top-0 lef-0 lg:flex flex-col items-center w-[208px] bg-[#FFFFFF] fixed min-h-screen p-2 hidden">
           <div className='w-[117px] m-4'>
                <img src={logo} alt="logo" />
           </div>

           <ul className='flex flex-col gap-12 mt-8 text-gray-500'>
                <li>
                    <NavLink 
                    to='users'
                    className={({isActive}) =>
                    isActive ? activesStyle : disabledStyle}> 
                    <UsersIcon className='h-6 w-6'/> Clientes</NavLink>
                </li>
                <li>
                    <NavLink 
                    to='others'
                    className={({isActive}) =>
                    isActive ? activesStyle : disabledStyle}> <CircleStackIcon className='h-6 w-6'/>Otros</NavLink>
                </li>
                <li>
                    <NavLink 
                    to='products'
                    className={({isActive}) =>
                    isActive ? activesStyle : disabledStyle}> <RectangleGroupIcon className='h-6 w-6'/>Productos</NavLink>
                </li>
                <li>
                    <NavLink 
                    to='providers'
                    className={({isActive}) =>
                    isActive ? activesStyle : disabledStyle}> <TruckIcon className='h-6 w-6'/>Proveedores</NavLink>
                </li>
                <li>
                    <NavLink 
                    to='tasks'
                    className={({isActive}) =>
                    isActive ? activesStyle : disabledStyle}> <DocumentPlusIcon className='h-6 w-6'/>Tareas</NavLink>
                </li>
           </ul>
        </nav>
    )
};

export default Nabvar;

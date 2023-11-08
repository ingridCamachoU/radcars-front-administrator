import { PlusIcon } from '@heroicons/react/24/solid';
import { DarkMode } from '../../context/DarkMode';
import { useContext } from 'react';

// eslint-disable-next-line react/prop-types
const HeaderPages = ({title, onClick}) => {

    const {darkMode} = useContext(DarkMode);
    
    return (
        <>
            <div className='flex w-full justify-between pr-10 items-center'>
                <h1 className={`${darkMode 
                    ? 'text-text-ligth text-3xl' 
                    : ' text-slate-950 text-3xl'
                }`}>
                    {title}
                </h1>
                <button
                    onClick={onClick}
                    className='bg-btn-style w-10 h-6 justify-center flex items-center rounded-xl hover:bg-btn-styleHover'>
                    <PlusIcon className='w-5 h-4 text-text-gray rounded-full bg-slate-50'/>
                </button>
            </div>        
        </>
    );
}

export default HeaderPages;

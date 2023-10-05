import { useContext } from 'react';
import { PencilIcon,TrashIcon } from '@heroicons/react/24/solid';
import Swal from 'sweetalert2';
import { useUSerContext } from '../../context/context_index';
import { DarkMode } from '../../context/DarkMode';
import { deleteProvider } from '../../services/providers';

// eslint-disable-next-line react/prop-types
const Table_data_providers = ({ setEditDataProv, setIsOpenModalAddProv, setTitle }) => {

    const { dataProviders, load_data_providers } = useUSerContext();

    const handleDeleteProvider = (id) => {
        Swal.fire({
            title: 'Eliminar provedor',
            text: "Está seguro de eliminar el provedor?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteProvider(id, load_data_providers);
            }
        })
    };

    const handleEditProduct = (provider) => {
        setEditDataProv(provider);
        setIsOpenModalAddProv(true)
        setTitle('Editar Proveedor');
    };

    const {darkMode} = useContext(DarkMode);

    return (
        <div className="flex flex-col overflow-x-auto w-full">
            <div className="sm:-mx-4 lg:-mx-4">
                <div className="inline-block min-w-full sm:px-2 lg:px-2">
                    <div className="overflow-x-auto">
                        <table className="w-full text-center text-s font-light pb-4 mb-4" >
                            <thead>
                                <tr className='bg-btn-style text-text-ligth'>
                                    <th className='px-2 py-2 font-medium'>Nit</th>
                                    <th className='px-2 py-2 font-medium'>Nombre</th>
                                    <th className='px-2 py-2 font-medium'>Contacto</th>
                                    <th className='px-2 py-2 font-medium'>Email</th>
                                    <th className='px-2 py-2 font-medium'>Acciones</th>
                                </tr>
                            </thead>

                            <tbody className={
                                `${darkMode 
                                    ? 'bg-background-dark_medium text-text-ligth' 
                                    : 'bg-background-ligth text-text-dark'
                                }`
                            }>
                                {   
                                    dataProviders.length === 0 
                                        ? <tr className='border-b text-center w-full'>
                                            <td colSpan="10" className='px-2 py-2 text-center w-full'>No hay datos</td>
                                        </tr> 
                                        : (dataProviders.map)(provider => (
                                            <tr key={provider.id} className='border-b '>
                                                <td className=' py-2'>{provider.nit}</td>
                                                <td className=' py-2'>{provider.name}</td>
                                                <td className=' py-2'>{provider.contact}</td>
                                                <td className=' py-2'>{provider.email}</td>
                                                <td className='flex py-2 gap-1 justify-center pr-2'>
                                                    <button 
                                                        className='bg-btn-yellow text-text-ligth p-1 rounded-lg'
                                                        onClick={() => handleEditProduct(provider)}>
                                                        <PencilIcon className='h4 w-4'/>
                                                    </button>
                                                    <button 
                                                        className='bg-btn-red text-text-ligth p-1 rounded-lg'
                                                        onClick={ () => handleDeleteProvider (provider.id)}>
                                                        <TrashIcon className='h4 w-4'/>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                }
                                
                            </tbody>
                        </table>  
                    </div>
                </div>
            </div>              
        </div>
    );
};

export default Table_data_providers;
           
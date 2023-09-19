import { PencilIcon,TrashIcon } from '@heroicons/react/24/solid';
import { useUSerContext } from '../../context/context_index';
import Swal from 'sweetalert2';
import { useModal } from '../../hooks/useModal';

const Table_data_providers = ({setEditDataProv, deleteProvider,isOpenModalAddProv, setIsOpenModalAddProv }) => {

    const { dataProviders} = useUSerContext();

    const handleDeleteProvider = (provider) => {

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
              deleteProvider(provider);
            }
        })
    };

    const handleEditProduct = (provider) => {
        setEditDataProv(provider);
        setIsOpenModalAddProv(true)
    };

    return (
        <>
            <table className="w-full text-center text-s font-light">
                <thead>
                    <tr className='bg-indigo-500 text-white px-2 py-2'>
                        <th className='px-2 py-2 font-medium'>Nit</th>
                        <th className='px-2 py-2 font-medium'>Nombre</th>
                        <th className='px-2 py-2 font-medium'>Contacto</th>
                        <th className='px-2 py-2 font-medium'>Email</th>
                        <th className='px-2 py-2 font-medium'>Acciones</th>
                    </tr>
                </thead>

                <tbody className='bg-white'>
                    {   
                        dataProviders.length === 0 ? <tr className='border-b text-center w-full'><td colSpan="10" className='px-2 py-2 text-center w-full'>No hay datos</td></tr> : (dataProviders.map)(provider => (
                        <tr key={provider.id} className='border-b '>
                            <td className='px-2 py-2'>{provider.nit}</td>
                            <td className='px-2 py-2'>{provider.name}</td>
                            <td className='px-2 py-2'>{provider.contact}</td>
                            <td className='px-2 py-2'>{provider.email}</td>
                            <td className='flex py-2 gap-1 justify-center pr-2'>
                                <button 
                                className='bg-yellow-500 text-white p-1 rounded-lg'
                                onClick={() => handleEditProduct(provider)}>
                                    <PencilIcon className='h4 w-4'/>
                                </button>
                                <button 
                                className='bg-red-500 text-white p-1 rounded-lg'
                                onClick={ () => handleDeleteProvider (provider.id)}>
                                    <TrashIcon className='h4 w-4'/>
                                </button>
                            </td>
                        </tr>
                        ))
                    }
                    
                </tbody>
            </table>
        </>
    );
};

export default Table_data_providers;

import { useContext } from 'react';
import { PencilIcon,TrashIcon } from '@heroicons/react/24/solid';
import { DarkMode } from '../../context/DarkMode';
import {helpAxios} from '../../services/helpAxios';
import { endPoints } from "../../services/endPoints/endPoints";
import { alert, confirAlert } from "../../utils/alerts";
import Loading from '../../components/Loading';

// eslint-disable-next-line react/prop-types
const TableDataProviders = ({ setEditDataProv, setIsOpenModalAddProv, setTitle, dataProvider, loadDataProvider, loading, error}) => {

    const handleDeleteProvider = (id) => {

        const config = {
            url: endPoints.providers.deleteProviders(id),
            method: 'DELETE',
            title: 'El proveedor ha sido eliminado', 
            icon: 'success',
            loadData: loadDataProvider
        }
        confirAlert('Eliminar proveedor','Está seguro de eliminar el proveedor?', 'warning', 'Eliminar', helpAxios, config);
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
                        {
                            loading 
                                ? <Loading />

                                : 
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
                                            dataProvider?.length === 0 
                                                ? <tr className='border-b text-center w-full'>
                                                    <td colSpan="10" className='px-2 py-2 text-center w-full'>No hay datos</td>
                                                </tr> 
                                                : (dataProvider.map)(provider => (
                                                    <tr key={provider.id} className='border-b '>
                                                        <td className=' py-2'>{provider.nit}</td>
                                                        <td className=' py-2'>{provider.name}</td>
                                                        <td className=' py-2'>{provider.contact}</td>
                                                        <td className=' py-2'>{provider.email}</td>
                                                        <td className='flex py-2 gap-1 justify-center pr-2'>
                                                            <button 
                                                                className='bg-btn-yellow text-text-ligth p-1 rounded-lg hover:bg-btn-yellowHover'
                                                                onClick={() => handleEditProduct(provider)}>
                                                                <PencilIcon className='h4 w-4'/>
                                                            </button>
                                                            <button 
                                                                className='bg-btn-red text-text-ligth p-1 rounded-lg hover:bg-btn-redHover'
                                                                onClick={ () => handleDeleteProvider (provider.id)}>
                                                                <TrashIcon className='h4 w-4'/>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                        }
                                        
                                    </tbody>
                                </table>  
                        }
                        {
                            error !== null 
                                ? alert('Error de conexión', 'error')
                                : null
                        }
                        
                    </div>
                </div>
            </div>              
        </div>
    );
};

export default TableDataProviders;
           
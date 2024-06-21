import { useContext } from "react";
import { DarkMode } from "../../context/DarkMode";
import { endPoints } from "../../services/endPoints/endPoints";
import { alert, confirAlert } from "../../utils/alerts";
import { helpAxios } from "../../services/helpAxios";
import Loading from "../../components/Loading";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

// eslint-disable-next-line react/prop-types
const TableUsers = ({ dataUser, loadDataUser, setIsOpenModalAddUser, setEditDataUser, setTitle, loading, error }) => {
    
    const { darkMode, token, canEditLocally } = useContext(DarkMode);
    
    //Delete User//
    const handleDeleteUser = (id) => {
        if(canEditLocally){ 
            alert('No tienes permiso para eliminar', 'error')
        }else {
            const config = {
                url: endPoints.users.deleUser(id),
                method: 'DELETE',
                title: 'El usuario ha sido eliminada', 
                icon: 'success',
                loadData: loadDataUser,
                token: token
            }
            confirAlert('Eliminar usuario','Está seguro de eliminar el usuario?', 'warning', 'Eliminar', helpAxios, config);
        }
    };

    //Update User//
    const handleEditUser = (user) => {
        setEditDataUser(user);
        setIsOpenModalAddUser(true); 
        setTitle('Editar usuario');
    };

    return (
        <div className="flex flex-col w-full px-2 mt-4 rounded">
            <div className="sm:-mx-4 lg:-mx-4">
                <div className="inline-block min-w-full sm:px-2 lg:px-2">
                    <div className="overflow-x-auto ">
                        {
                            loading 
                                ? <Loading />

                                : 
                                <table className="w-full text-center text-s font-light mb-4" >
                                    <thead>
                                        <tr className='bg-btn-style text-text-ligth'>
                                            <th className='px-4 py-2 font-medium'>CC</th>
                                            <th className='px-4 py-2 font-medium'>Nombre</th>
                                            <th className='px-4 py-2 font-medium'>Telefono</th>
                                            <th className='px-4 py-2 font-medium'>Role</th>
                                            <th className='px-4 py-2 font-medium'>Correo</th>
                                            <th className='px-4 py-2 font-medium'>Dirección</th>
                                            <th className='px-4 py-2 font-medium'>Acciones</th>
                                        </tr>
                                    </thead>

                                    <tbody className={
                                        `${darkMode 
                                            ? 'bg-background-dark_medium text-text-ligth' 
                                            : 'bg-background-ligth text-text-dark'
                                        }`
                                    }>
                                        {   
                                            dataUser?.data?.length === 0 
                                                ? <tr className='border-b text-center w-full'>
                                                    <td 
                                                        colSpan="10" 
                                                        className='px-4 py-2 text-center'>
                                                        No hay datos</td>
                                                </tr> 
                                                : dataUser?.data?.map(user => (
                                                    <tr 
                                                        key={user.id} 
                                                        className='border-b w-full'>
                                                        <td className='px-4 py-4'>{user.cc}</td>
                                                        <td className='py-2 px-4'>{user.name}</td>
                                                        <td className='px-4 py-4'>{user.phone}</td>
                                                        <td className='py-2 px-4'>{user.role}</td>
                                                        <td className='py-2 px-4'>{user.email}</td>
                                                        <td className='py-2 px-4'>{user.address}</td>
                                                        <td className='flex py-2 gap-1 justify-center items-center pt-4 pr-4'>
                                                            <button 
                                                                className='bg-btn-yellow text-text-ligth p-1 rounded-lg hover:bg-btn-yellowHover'
                                                                onClick={() => handleEditUser(user)}>
                                                                <PencilIcon className='h4 w-4'/>
                                                            </button>

                                                            <button 
                                                                className='bg-btn-red text-text-ligth p-1 rounded-lg hover:bg-btn-redHover'
                                                                onClick={ () => handleDeleteUser (user.id)}>
                                                                <TrashIcon className='h4 w-4'/>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                        }                              
                                    </tbody>
                                </table>
                        }
                          
                        {error && (
                            <div className="text-red-500">
                                Error al cargar los datos. Por favor, inténtalo de nuevo más
                                tarde.
                            </div>
                        )}
                    </div>
                </div>
            </div>
                
        </div>
    );
};

export default TableUsers;

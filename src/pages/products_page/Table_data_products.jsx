import { PencilIcon,EyeIcon,TrashIcon } from '@heroicons/react/24/solid';
import { useUSerContext } from '../../context/context_index';
import Swal from 'sweetalert2';
import { useContext } from 'react';
import { DarkMode } from '../../context/DarkMode';

const Table_data_products = ({deleteProduct, openModalEditProduct, setEditDataProduct, load_data_quotation }) => {

    const { dataProducts} = useUSerContext();

    const handleDeleteProduct = (product) => {

        Swal.fire({
            title: 'Eliminar producto',
            text: "Está seguro de eliminar el producto?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar'
        }).then((result) => {
            if (result.isConfirmed) {
              deleteProduct(product);
            }
        })
    };

    const handleEditProduct = (product) => {
        setEditDataProduct(product);
        openModalEditProduct(); 
        load_data_quotation(product);
    };
 
    const {darkMode} = useContext(DarkMode);
    return (
        <div className="flex flex-col overflow-x-auto w-full">
            <div className="sm:-mx-4 lg:-mx-4">
                <div className="inline-block min-w-full sm:px-2 lg:px-2">
                    <div className="overflow-x-auto">
                        <table className="w-full text-center text-s font-light pb-4 mb-4" >
                            <thead>
                                <tr className='bg-indigo-500 text-white'>
                                    <th className='px-4 py-2 font-medium'>Código</th>
                                    <th className='px-2 py-2 font-medium'>Nombre</th>
                                    <th className='px-2 py-2 font-medium'>Categoría</th>
                                    <th className='px-2 py-2 font-medium'>Modelo</th>
                                    <th className='px-2 py-2 font-medium'>Transmisión</th>
                                    <th className='px-2 py-2 font-medium'>Precio</th>
                                    <th className='px-2 py-2 font-medium'>% Ganancia</th>
                                    <th className='px-2 py-2 font-medium'>Stock</th>
                                    <th className='px-2 py-2 font-medium'>Acciones</th>
                                </tr>
                            </thead>

                            <tbody className={`${darkMode ? 'bg-[#212130] text-white' : 'bg-white text-black'}`}>
                                {   
                                    dataProducts.length === 0 ? <tr className='border-b text-center w-full'><td colSpan="10" className='px-4 py-2 text-center'>No hay datos</td></tr> : (dataProducts.map)(product => (
                                    <tr key={product.id} className='border-b w-full'>
                                        <td className='px-4 py-4'>{product.code}</td>
                                        <td className='py-2'>{product.name}</td>
                                        <td className='py-2'>{product.category.name}</td>
                                        {
                                            product.mark_model === '' ? <td className=' py-2'>--</td> : <td className='px-2 py-2'>{product.mark_model?.name} ({product.mark_model?.mark?.name})</td>
                                        }
                                            
                                        {
                                            product.transmission === '' ? <td className='px-2 py-2'>--</td> : <td className='px-2 py-2'>{product.transmission}</td>
                                        }
                                        <td className='py-2'>{product.price}</td>
                                        <td className=' py-2'>{product.profit}</td>
                                        <td className=' py-2'>{product.stock}</td>
                                        <td className='flex py-2 gap-1 justify-center items-center pr-2 pt-6'>
                                            <button 
                                            className='bg-yellow-500 text-white p-1 rounded-lg'
                                            onClick={() => handleEditProduct(product)}
                                            ><PencilIcon className='h4 w-4'/></button>

                                            <button 
                                            className='bg-red-500 text-white p-1 rounded-lg'
                                            onClick={ () => handleDeleteProduct (product.id)} 
                                            ><TrashIcon className='h4 w-4'/></button>

                                            <button 
                                            className='bg-blue-400 text-white p-1 rounded-lg'
                                            item={product}
                                            ><EyeIcon className='h4 w-4'/></button>
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

export default Table_data_products;

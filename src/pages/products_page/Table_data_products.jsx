import { PencilIcon,EyeIcon,TrashIcon } from '@heroicons/react/24/solid';
import { useUSerContext } from '../../context/context_index';
import Swal from 'sweetalert2';

const Table_data_products = ({deleteProduct}) => {

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

 
    return (
        <>
            <table className="w-full text-center text-s font-light z-0">
                <thead>
                    <tr className='bg-indigo-500 text-white px-2 py-2'>
                        <th className='px-2 py-2 font-medium'>Código</th>
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

                <tbody className='bg-white'>
                    {   
                        dataProducts.length === 0 ? <tr><td>No hay datos</td></tr> : (dataProducts.map)(product => (
                        <tr key={product.id} className='border-b '>
                            <td className='px-2 py-2'>{product.code}</td>
                            <td className='px-2 py-2'>{product.name}</td>
                            <td className='px-2 py-2'>{product.category.name}</td>
                            {
                                product.mark_model === '' ? <td className='px-2 py-2'>--</td> : <td className='px-2 py-2'>{product.mark_model?.name} ({product.mark_model?.mark?.name})</td>
                            }
                                
                            {
                                product.transmission === '' ? <td className='px-2 py-2'>--</td> : <td className='px-2 py-2'>{product.transmission}</td>
                            }
                            <td className='px-2 py-2'>{product.price}</td>
                            <td className='px-2 py-2'>{product.profit}</td>
                            <td className='px-2 py-2'>{product.stock}</td>
                            <td className='flex py-2 gap-1 justify-center pr-2'>
                                <button 
                                className='bg-yellow-500 text-white p-1 rounded-lg'
                                item={product}
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
        </>
    );
};

export default Table_data_products;

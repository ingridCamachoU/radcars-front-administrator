import { PencilIcon,TrashIcon } from '@heroicons/react/24/solid';

const Table_data_providers = ({providers}) => {
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
                        providers.length === 0 ? <tr><td>No hay datos</td></tr> : (providers.map)(provider => (
                        <tr key={provider.id} className='border-b '>
                            <td className='px-2 py-2'>{provider.nit}</td>
                            <td className='px-2 py-2'>{provider.name}</td>
                            <td className='px-2 py-2'>{provider.contact}</td>
                            <td className='px-2 py-2'>{provider.email}</td>
                            <td className='flex py-2 gap-1 justify-center pr-2'>
                                <button className='bg-yellow-500 text-white p-1 rounded-lg'><PencilIcon className='h4 w-4'/></button>
                                <button className='bg-red-500 text-white p-1 rounded-lg'><TrashIcon className='h4 w-4'/></button>
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

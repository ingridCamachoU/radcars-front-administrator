import { useContext } from "react";
import Header_pages from "../../components/header_pages/Header_pages";
import { useUSerContext } from "../../context/context_index";
import { PencilIcon,TrashIcon } from '@heroicons/react/24/solid';
import Swal from 'sweetalert2';
import { DarkMode } from "../../context/DarkMode";
import { deleteCategorie } from "../../services/categories";
import { deleteMark } from "../../services/marks";
import { deleteModel } from "../../services/models";

// eslint-disable-next-line react/prop-types
const Table_others = ({ setEditDataCategorie, setIsOpenModalCreateMark, setEditDataMark, setEditDataModel, setIsOpenModalCreateCategorie, setIsOpenModalCreateModel }) => {

    const {dataCategories, dataModels, dataMark, load_Categories_products, load_data_marks, load_Models_products} = useUSerContext();

    //--Categorie--//
    const handleEditCategorie = (categorie) => {
        setEditDataCategorie(categorie);
        setIsOpenModalCreateCategorie(true)
    };

    const handleDeleteCategorie = (id) => {
        Swal.fire({
            title: 'Eliminar categoria',
            text: "Está seguro de eliminar la categoria?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteCategorie(id, load_Categories_products);
            }
        })
    };

    //--Mark--//
    const handleEditMark = (mark) => {
        setEditDataMark(mark);
        setIsOpenModalCreateMark(true);
    };

    const handleDeleteMark = (id) => {
        Swal.fire({
            title: 'Eliminar marca',
            text: "Está seguro de eliminar la marca?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMark(id, load_data_marks);
            }
        })
    };

    //--Model--//
    const handleEditModel = (model) => {
        setEditDataModel(model);
        setIsOpenModalCreateModel(true);
    };

    const handleDeleteModel = (id) => {
        Swal.fire({
            title: 'Eliminar modelo',
            text: "Está seguro de eliminar el modelo?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteModel(id, load_Models_products);
            }
        })
    };

    const {darkMode} = useContext(DarkMode);

    return (
        <div className="w-full text-center text-s font-light z-0 flex justify-between col-span-3 gap-6 lg:w-[1500px] pb-4 mb-4">
            
            {/* table Category */}
            <div className="w-full pl-4">
                <div className="p-2">
                    <Header_pages 
                        title={'Categoria'} 
                        onClick={(() => setIsOpenModalCreateCategorie(true))}/>
                </div>
                <table className="text-center text-s font-light w-full">
                    <thead>
                        <tr className='bg-btn-style text-text-ligth '>
                            <th className='px-2 py-2 font-medium'>Nombre</th>
                            <th className='px-2 py-2 font-medium'>Acciones</th>
                        </tr>
                    </thead>

                    <tbody className={
                        `${darkMode 
                            ? 'bg-background-dark_medium text-text-ligth' 
                            : 'bg-background-ligth text-text-dark'
                        }`}>
                        {   
                            dataCategories.length === 0 
                                ? <tr>
                                    <td 
                                        colSpan="6" 
                                        className="text-center">
                                        No hay datos
                                    </td>
                                </tr>
                                : (dataCategories.map)( categorie=> (
                                    <tr  
                                        key={categorie.id} 
                                        className='border-b p-4'>
                                        <td className='px-4 py-4'>{categorie.name}</td>
                                        <td className='flex py-4 gap-1 justify-end pr-4'>
                                            <button 
                                                className='bg-btn-yellow text-text-ligth p-1 rounded-lg'
                                                onClick={() => handleEditCategorie(categorie)}>
                                                <PencilIcon className='h4 w-4'/>
                                            </button>

                                            <button 
                                                className='bg-btn-red text-text-ligth p-1 rounded-lg'
                                                onClick={ () => handleDeleteCategorie(categorie.id)}>
                                                <TrashIcon className='h4 w-4'/>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                        }
                    </tbody>    
                </table>
            </div>

            {/* table Marca */}
            <div className="w-full">
                <div className="p-2">
                    <Header_pages 
                        title={'Marca'} 
                        onClick={() => setIsOpenModalCreateMark(true)}/>
                </div>
                <table className="text-center text-s font-light w-full">
                    <thead>
                        <tr className='bg-btn-style text-text-ligth'>
                            <th className='px-2 py-2 font-medium'>Nombre</th>
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
                            dataMark.length === 0 
                                ? <tr>
                                    <td 
                                        colSpan="6" 
                                        className="text-center">
                                        No hay datos
                                    </td>
                                </tr>
                                : (dataMark.map)( mark=> (
                                    <tr  
                                        key={mark.id} 
                                        className='border-b p-4'>
                                        <td className='px-4 py-4'>{mark.name}</td>
                                        <td className='flex py-4 gap-1 justify-end pr-4'>
                                            <button 
                                                className='bg-btn-yellow text-text-ligth p-1 rounded-lg'
                                                onClick={() => handleEditMark(mark)}>
                                                <PencilIcon className='h4 w-4'/>
                                            </button>

                                            <button 
                                                className='bg-btn-red text-text-ligth p-1 rounded-lg'
                                                onClick={ () => handleDeleteMark(mark.id)}>
                                                <TrashIcon className='h4 w-4'/>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                        }
                    </tbody>    
                </table>
            </div>

            {/* table Modelo */}
            <div className="w-full pr-4">
                <div className="p-2">
                    <Header_pages 
                        title={'Modelo'} 
                        onClick={() => setIsOpenModalCreateModel(true)}/>
                </div>
                <table className="text-center text-s font-light w-full">
                    <thead>
                        <tr className='bg-btn-style text-text-ligth'>
                            <th className='px-2 py-2 font-medium'>Nombre</th>
                            <th className='px-2 py-2 font-medium'>Marca</th>
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
                            dataModels.length === 0 
                                ? <tr>
                                    <td colSpan="6" className="text-center">
                                        No hay datos
                                    </td>
                                </tr>
                                : (dataModels.map)( model=> (
                                    <tr  
                                        key={model.id} 
                                        className='border-b p-4'>
                                        <td className='px-4 py-4'>{model.name}</td>
                                        <td className='px-4 py-4'>{model.mark.name}</td>
                                        <td className='flex py-4 gap-1 justify-end pr-4'>
                                            <button 
                                                className='bg-btn-yellow text-text-ligth p-1 rounded-lg'
                                                onClick={() => handleEditModel(model)}>
                                                <PencilIcon className='h4 w-4'/>
                                            </button>

                                            <button 
                                                className='bg-btn-red text-text-ligth p-1 rounded-lg'
                                                onClick={ () => handleDeleteModel(model.id)}>
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
    );
}

export default Table_others;

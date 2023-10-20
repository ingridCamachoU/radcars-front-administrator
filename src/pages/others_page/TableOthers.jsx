import { useContext } from "react";
import { PencilIcon,TrashIcon } from '@heroicons/react/24/solid';
import { DarkMode } from "../../context/DarkMode";
import { endPoints } from "../../services/endPoints/endPoints";
import { alert, confirAlert } from "../../utils/alerts";
import {helpAxios} from '../../services/helpAxios';
import HeaderPages from "../../components/headerPages/HeaderPages";
import Loading from '../../components/Loading';

// eslint-disable-next-line react/prop-types
const TableOthers = ({ setEditDataCategorie, setIsOpenModalCreateMark, setEditDataMark, setEditDataModel, setIsOpenModalCreateCategorie, setIsOpenModalCreateModel, dataCategories, dataMark, dataModel, loadCategoriesProducts, loadMarkProducts, loadModelProducts, loadingCategory, errorCategorie, loadingMark, errorMark, loadingModel, errorModel }) => {

    //--Categorie--//
    const handleEditCategorie = (categorie) => {
        setEditDataCategorie(categorie);
        setIsOpenModalCreateCategorie(true)
    };

    const handleDeleteCategorie = (id) => {

        const config = {
            url: endPoints.categories.deleteCategories(id),
            method: 'DELETE',
            title: 'La categoria ha sido eliminada', 
            icon: 'success',
            loadData: loadCategoriesProducts
        }
        confirAlert('Eliminar categoria','Está seguro de eliminar la categoria?', 'warning', 'Eliminar', helpAxios, config);
    };

    //--Mark--//
    const handleEditMark = (mark) => {
        setEditDataMark(mark);
        setIsOpenModalCreateMark(true);
    };

    const handleDeleteMark = (id) => {
        const config = {
            url: endPoints.marks.deleteMarks(id),
            method: 'DELETE',
            title: 'La marca ha sido eliminada', 
            icon: 'success',
            loadData: loadMarkProducts
        }
        confirAlert('Eliminar marca','Está seguro de eliminar la marca?', 'warning', 'Eliminar', helpAxios, config);
    };

    //--Model--//
    const handleEditModel = (model) => {
        setEditDataModel(model);
        setIsOpenModalCreateModel(true);
    };

    const handleDeleteModel = (id) => {

        const config = {
            url: endPoints.models.deleteModels(id),
            method: 'DELETE',
            title: 'El modelo ha sido eliminado', 
            icon: 'success',
            loadData: loadModelProducts
        }
        confirAlert('Eliminar modelo','Está seguro de eliminar el modelo?', 'warning', 'Eliminar', helpAxios, config);
    };

    const {darkMode} = useContext(DarkMode);

    return (
        <div className="w-full text-center text-s font-light z-0 flex justify-between col-span-3 gap-6 lg:w-[1500px] pb-4 mb-4">
            
            {/* table Category */}
            <div className="w-full pl-4">
                <div className="p-2">
                    <HeaderPages 
                        title={'Categoria'} 
                        onClick={(() => setIsOpenModalCreateCategorie(true))}/>
                </div>
                {
                    loadingCategory 
                        ? <Loading />

                        : 
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
                }
                {
                    errorCategorie !== null 
                        ? alert('Error de conexión', 'error')
                        : null
                }
                
            </div>

            {/* table Marca */}
            <div className="w-full">
                <div className="p-2">
                    <HeaderPages 
                        title={'Marca'} 
                        onClick={() => setIsOpenModalCreateMark(true)}/>
                </div>
                {
                    loadingMark
                        ? <Loading />

                        :
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
                }
                {
                    errorMark !== null 
                        ? alert('Error de conexión', 'error')
                        : null
                }
                
            </div>

            {/* table Modelo */}
            <div className="w-full pr-4">
                <div className="p-2">
                    <HeaderPages 
                        title={'Modelo'} 
                        onClick={() => setIsOpenModalCreateModel(true)}/>
                </div>
                {
                    loadingModel
                        ? <Loading />

                        :
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
                                    dataModel.length === 0 
                                        ? <tr>
                                            <td colSpan="6" className="text-center">
                                                No hay datos
                                            </td>
                                        </tr>
                                        : (dataModel.map)( model=> (
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

                }
                {
                    errorModel !== null 
                        ? alert('Error de conexión', 'error')
                        : null
                }
                
            </div>        
        </div>
    );
}

export default TableOthers;

import { useContext, useEffect, useState } from "react";
import { XMarkIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useForm } from "../../hooks/useForm";
import { initialFormProduct } from "../../utils/initialialization";
import { DarkMode } from "../../context/DarkMode";
import {helpAxios} from '../../services/helpAxios';
import { endPoints } from "../../services/endPoints/endPoints";
import { confirAlert } from "../../utils/alerts";

// eslint-disable-next-line react/prop-types
const FormAddProduct = ({ isOpenModalAddProduct, setIsOpenModalAddProduct, editDataProduct,setEditDataProduct, title, datasQuotation, setIsOpenModalCreateQuotation,loadDataProducts, dataModel, dataCategorie }) => {

    const [ formData, handleChange, setFormData ] = useForm(initialFormProduct);
    const { darkMode, token } = useContext(DarkMode);
   
    //---Form Validation---//
    const [ errors, setErrors ] = useState({});
    const onValidate = (formData)=>{
        let errors = {};
        let regexCode = /^([0-9-A-Za-zÑñÁáÉéÍíÓóÚúÜüs]){5,20}$/;
        let regexName = /^.([0-9-A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]){5,50}$/;
        let regexDescription = /^.{1,80}$/;
        let regexPrice = /^[0-9]+$/;
        let regexStock = /^[0-9]+$/;

        if (!formData.code.trim()){
            errors.code= 'El campo "Código" no debe ser vacio.';
        }else if(!regexCode.test(formData.code)){
            errors.code= 'El campo "Código" es incorrecto, no puede tener espacios en blanco y debe tener más de 5 caracteres';
        }

        if (!formData.name.trim()){
            errors.name= 'El campo "Nombre" no debe ser vacio.';
        }else if(!regexName.test(formData.name)){
            errors.name= 'El campo "Nombre" es incorrecto debe tener más  de 5 caracteres.';
        }

        if (!formData.description.trim()){
            errors.description= 'El campo "Descripción" no debe ser vacio.';
        }else if(!regexDescription.test(formData.description)){
            errors.description= 'El campo "Descripción" debe tener de 5 hasta  50 caracteres.';
        }

        if(!regexPrice.test(formData.price)){
            errors.price= 'El campo "Precio" no debe estar vacio.';
        }

        if(!regexStock.test(formData.stock)){
            errors.stock= 'El campo "Stock" no debe estar vacio.';
        }
        return errors;
    };

    const err= onValidate(formData);

    const closeModalReset = () => {
        setErrors({});
        setEditDataProduct(null);
        setIsOpenModalAddProduct(false);
        setFormData(initialFormProduct);
    };

    console.log(editDataProduct)
    useEffect(() => {
        if( editDataProduct !== null){
            const copyData = {
                "code": editDataProduct?.code,
                "name": editDataProduct?.name,
                "description": editDataProduct?.description,
                "price": editDataProduct?.price,
                "stock": editDataProduct?.stock,
                "profit": editDataProduct?.profit,
                "category": editDataProduct?.category?.id,
                "transmission": editDataProduct?.transmission,
                "mark_model": editDataProduct?.mark_model?.id,
                "images": editDataProduct?.images,
            }
            console.log(copyData)
            setFormData(copyData);
        } else{
            setFormData(initialFormProduct);
        }
    },[editDataProduct]);

    const handleSubmit = (e)=>{
        e.preventDefault();
        setErrors(err); 
        
        if (Object.keys(err).length === 0) {
            const isEdit = editDataProduct !== null;
            const config = {
                url: isEdit ? endPoints.products.updateProduct(editDataProduct?.id) : endPoints.products.getProducts,
                method: isEdit ? 'PUT' : 'POST',
                body: formData,
                title: isEdit ? 'Producto editado con éxito' : 'Producto agregado con éxito',
                icon: 'success',
                loadData: loadDataProducts,
                token: token
            };
        
            helpAxios(config);
        
            if (isEdit) {
                setEditDataProduct(null);
            }
            
            setFormData(initialFormProduct);
            setIsOpenModalAddProduct(false);
            setErrors('');
        } else{
            setErrors(err);
        }
    };
    
    const addImage=(e)=>{
        const {name, value}= e.target;
        setFormData({
            ...formData, 
            [name]:[value],
        });
    };

    const handleModalClick = e => e.stopPropagation();

    //Add Quotation//
    const handleClickCotizar =()=>{
        setIsOpenModalCreateQuotation(true);
        setIsOpenModalAddProduct(false);
    };

    //Delete Quotation//
    const handleClickDeleteQuotation = (quotation, editDataProduct) => {

        const config = {
            url: endPoints.quotations.deleteQuotations(quotation?.id, editDataProduct?.id),
            method: 'DELETE',
            title: 'La cotización ha sido eliminada', 
            icon: 'success',
            token: token
        }
        confirAlert('Eliminar Cotización','Está seguro de eliminar la cotización?', 'warning', 'Eliminar', helpAxios, config);
        setIsOpenModalAddProduct(false);
    };

    return (
        <div 
            className={
                `${isOpenModalAddProduct 
                    ? 'flex flex-col top-0 items-center justify-center flex-wrap z-40 w-full min-h-screen overflow-auto fixed' 
                    : 'hidden'
                } ${darkMode 
                    ? 'bg-modal-dark'
                    : 'bg-modal-ligth'
                }`
            }
            onClick={closeModalReset}>
            <form 
                className={
                    `${isOpenModalAddProduct && 'shadow-xl lg:p-8 rounded-lg flex absolute flex-col lg:w-[600px] flex-wrap md:w-4/6 sm:w-4/6 w-10/12 p-4 top-16'} ${darkMode 
                        ? 'bg-background-dark_medium'
                        : 'bg-background-ligth'
                    }`
                }
                onClick={handleModalClick}
                onSubmit={handleSubmit}>
                <div className="flex justify-between mb-6 flex-wrap mt-0 sm:mt-4">
                    <h1 
                        className={
                            `${darkMode 
                                ? 'text-text-ligth text-2xl ml-2' 
                                : 'text-text-dark text-2xl ml-2'
                            }`
                        }>
                        {title}
                    </h1>
                    <span 
                        onClick={closeModalReset}>
                        <XMarkIcon className={ `${darkMode 
                            ? 'h6 w-6 cursor-pointer text-text-ligth' 
                            : 'h6 w-6 cursor-pointer text-text-dark'
                        }`} />
                    </span>
                </div>

                <div className={
                    `${darkMode 
                        ? 'flex mb-4 gap-6 justify-center lg:flex-row flex-col w-full text-text-ligth' 
                        : 'flex mb-4 gap-6 justify-center lg:flex-row flex-col w-full'
                    }`
                }>
                    <div className="flex-col flex w-1/2">
                        <label>Código</label>
                        <input 
                            type="text" required
                            className="border border-border-gray rounded-lg p-1 w-full text-text-dark"
                            name="code"
                            value={formData.code}
                            onChange={handleChange}
                        />
                        {errors.code && <p className="text-text-red">{errors.code}</p>}
                    </div>
                    
                    <div className="flex-col flex w-1/2">
                        <label>Nombre</label>
                        <input 
                            type="text" required
                            className="border border-border-gray rounded-lg p-1 w-full text-text-dark"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        {errors.name && <p className="text-text-red">{errors.name}</p>}
                    </div>                
                </div>

                <div className={
                    `${darkMode 
                        ? 'flex mb-4 gap-6 justify-center lg:flex-row flex-col w-full text-text-ligth' 
                        : 'flex mb-4 gap-6 justify-center lg:flex-row flex-col w-full'
                    }`
                }>
                    <div className=" flex-col flex w-1/2">
                        <label>Categoria</label>
                        <select 
                            className="border border-border-gray rounded-lg p-1 w-full mr-6 text-text-dark" 
                            name="category_id" required
                            onChange={handleChange} 
                            value={formData.category_id} >
                            <option className="text-text-dark"></option>
                            {dataCategorie?.data?.map(category => (
                                <option 
                                    key={category.id}
                                    value={category.id} className="text-text-dark">{category.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex-col flex w-1/2">
                        <label>Precio</label>
                        <input 
                            type="number" required
                            className="border border-border-gray rounded-lg p-1 w-full text-text-dark"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                        />
                        {errors.price && <p className="text-text-red">{errors.price}</p>}
                    </div>
                </div>

                <div className={
                    `${darkMode 
                        ? 'flex mb-4 gap-6 justify-center lg:flex-row flex-col w-full text-text-ligth' 
                        : 'flex mb-4 gap-6 justify-center lg:flex-row flex-col w-full'
                    }`
                }>                
                    <div className="flex-col flex w-1/2">
                        <label>% Ganancia</label>
                        <input 
                            type="number" required
                            className="border border-border-gray rounded-lg p-1 w-full text-text-dark"
                            name="profit"
                            value={formData.profit}
                            onChange={handleChange}
                        />
                        {errors.profit && <p className="text-text-red">{errors.profit}</p>}
                    </div>

                    <div className="flex-col flex w-1/2">
                        <label>Stock</label>
                        <input 
                            type="number" required
                            className="border border-border-gray rounded-lg mr-4 p-1 w-full text-text-dark"
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                        />
                        {errors.stock && <p className="text-text-red">{errors.stock}</p>}
                    </div>
                </div>

                <div className={
                    `${darkMode 
                        ? 'flex mb-4 gap-6 justify-center lg:flex-row flex-col w-full text-text-ligth' 
                        : 'flex mb-4 gap-6 justify-center lg:flex-row flex-col w-full'
                    }`
                }>
                    <div className="flex flex-col w-1/2">
                        <label>Modelo</label>
                        <select 
                            className="border border-border-gray rounded-lg mr-6 p-1 w-full text-text-dark" 
                            name="model_id" 
                            onChange={handleChange} 
                            value={formData.model_id}>
                            <option ></option>
                            {
                                dataModel?.data?.map(mark_model => (
                                    <option 
                                        key={mark_model.id} 
                                        className="text-text-dark"
                                        value={mark_model.id} >{mark_model.name} ({mark_model.mark.name})</option>
                                ))}  
                        </select>
                    </div>
                    <div className="flex flex-col w-1/2">
                        <label>Transmisión</label>
                        <select className="border border-border-gray rounded-lg mr-4 p-1 w-full text-text-dark" 
                            name="transmission" 
                            onChange={handleChange} 
                            value={formData.transmission}>
                            <option value=""></option>
                            <option value="automatica">Automático</option>
                            <option value="mecanico">Mecánico</option>
                        </select>
                    </div>
                </div>

                <div className={
                    `${darkMode 
                        ? 'flex mb-4 gap-6 justify-center lg:flex-row flex-col w-full text-text-ligth' 
                        : 'flex mb-4 gap-6 justify-center lg:flex-row flex-col w-full'
                    }`
                }>
                    <div className="flex flex-col w-1/2">
                        <label>Imagenes</label>
                        <input 
                            type="text"
                            className="border border-border-gray rounded-lg p-1 w-full text-text-dark"
                            name="images"
                            value={formData.images} 
                            onChange={addImage}/>
                    </div>
                    <div className="flex-col flex w-1/2">
                        <label>Descripción</label>
                        <textarea 
                            className="border border-border-gray rounded-lg p-1 w-full text-text-dark"
                            name="description" required
                            value={formData.description}
                            onChange={handleChange}/>
                        {errors.description && <p className="text-danger">{errors.description}</p>}
                    </div>             
                </div>

                <div className=" flex mb-4 gap-6 justify-end lg:mr-20 mr-6">

                    {
                        !editDataProduct ? 
                            <input 
                                type="reset" 
                                value='Cancelar' 
                                onClick={closeModalReset}
                                className="rounded-lg bg-btn-red p-2 text-text-ligth cursor-pointer hover:bg-btn-redHover"/>
                            : null
                    }

                    <input 
                        type="submit" 
                        value='Guardar'
                        className="rounded-lg bg-btn-style p-2 text-text-ligth cursor-pointer hover:bg-btn-styleHover"/>

                    {
                        editDataProduct ? 
                            <input 
                                type="button" 
                                value='Cotizar'
                                onClick={()=> {handleClickCotizar(formData.id)}}
                                className="rounded-lg bg-btn-gray hover:bg-btn-grayHover p-2 text-text-ligth cursor-pointer"/>
                            : null
                    }
                </div>

                {
                    editDataProduct 
                        ? <div className=" flex mb-4 gap-6 justify-center lg:flex-row flex-col">
                            <div className="w-full">
                                <h3 className={
                                    `${darkMode 
                                        ? 'text-text-ligth text-2xl mb-4' 
                                        : 'text-text-dark text-2xl mb-4'
                                    }`
                                }>Cotizaciones
                                </h3>

                               
                                <table className='bg-background-ligth w-full'>
                                    <thead>
                                        <tr className='bg-btn-style text-text-ligth px-2 py-2'>
                                            <th className='px-2 py-2 font-medium'>Proveedor</th>
                                            <th className='px-2 py-2 font-medium'>Precio</th>
                                            <th className='px-2 py-2 font-medium'>Descripción</th>
                                            <th className='px-2 py-2 font-medium'>Acciones</th>
                                        </tr>
                                    </thead>

                                    <tbody className={
                                        `${darkMode 
                                            ? 'bg-background-dark text-text-ligth text-center' 
                                            : 'bg-background-ligth text-center'
                                        }`
                                    }>

                                        {   
                                            datasQuotation?.data?.length === 0 
                                                ? <tr>
                                                    <td 
                                                        colSpan="6" 
                                                        className="text-center">
                                                        No hay cotizaciones
                                                    </td>
                                                </tr>
                                                : datasQuotation?.data?.map( quotation => (
                                                    <tr 
                                                        key={quotation.id} className='border-b'>
                                                        <td className='px-2 py-2'>{quotation.provider.name}</td>
                                                        <td className='px-2 py-2'>{quotation.price}</td>
                                                        <td className='px-2 py-2'>Descripcion</td>
                                                        <td className="text-center">
                                                            <button 
                                                                type="reset"
                                                                className='bg-btn-red text-text-ligth p-1 rounded-lg hover:bg-btn-redHover'
                                                                onClick={() => handleClickDeleteQuotation(quotation, editDataProduct)}>
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

                        : null
                }

            </form>   
        </div>
    );
};

export default FormAddProduct;

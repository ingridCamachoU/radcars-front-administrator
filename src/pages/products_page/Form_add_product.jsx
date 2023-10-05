import { useContext, useEffect, useState } from "react";
import { XMarkIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useForm } from "../../hooks/useForm";
import { useUSerContext } from "../../context/context_index";
import { initialFormProduct } from "../../utils/initialialization";
import { DarkMode } from "../../context/DarkMode";
import { addProduct, updateProduct } from "../../services/products";
import Swal from 'sweetalert2';
import { deleteQuotation } from "../../services/quotation";

// eslint-disable-next-line react/prop-types
const Form_add_product = ({isOpenModalAddProduct, setIsOpenModalAddProduct, editDataProduct,setEditDataProduct, title, datasQuotation, setIsOpenModalCreateQuotation}) => {

    const { load_data_products, dataModels, dataCategories} = useUSerContext();

    const [formData, handleChange, setFormData] = useForm(initialFormProduct);
   
    //---Form Validation---//
    const [errors, setErrors] = useState({});
    const onValidate = (formData)=>{
        let errors = {};
        let regexCode = /^([0-9-A-Za-zÑñÁáÉéÍíÓóÚúÜüs]){5,20}$/;
        let regexName = /^([0-9-A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]){5,20}$/;
        let regexDescription = /^.{1,50}$/;
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
        setEditDataProduct(null);
        setIsOpenModalAddProduct(false);
        setFormData(initialFormProduct);
    };

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
            setFormData(copyData);
        } else{
            setFormData(initialFormProduct);
        }
    },[editDataProduct]);

    const handleSubmit = (e)=>{
        e.preventDefault();
        setErrors(err);        
        if (Object.keys(err).length === 0){
            if (formData.nit !== '' && formData.name !== ''  && formData.contact !== '' && formData.email !== ''){
                if (editDataProduct !== null){
                    updateProduct(editDataProduct?.id, formData, load_data_products);
                    setFormData(initialFormProduct);
                    setIsOpenModalAddProduct(false);
                    setErrors('');                  
                } else {
                    addProduct(formData, load_data_products);
                    setFormData(initialFormProduct);
                    setIsOpenModalAddProduct(false);
                }
            } 
        }else{
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

    const {darkMode} = useContext(DarkMode);

    //Add Quotation//
    const handleClickCotizar =()=>{
        setIsOpenModalCreateQuotation(true);
        setIsOpenModalAddProduct(false);
    };

    //Delete Quotation//
    const handleClickDeleteQuotation =(quotation, editDataProduct)=>
    {
        Swal.fire({
            title: 'Eliminar Cotización',
            text: "Está seguro de eliminar la Cotización?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar'
        }).then((result) => {
            if (result.isConfirmed) {
                console.log(editDataProduct)
                deleteQuotation(quotation?.id, editDataProduct?.id);
                setIsOpenModalAddProduct(false);
            }
        })
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
                    `${isOpenModalAddProduct && 'shadow-xl lg:p-4 rounded-lg flex absolute flex-col lg:w-[600px] flex-wrap md:w-4/6 sm:w-4/6 w-10/12 p-4 top-16'} ${darkMode 
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
                                : 'text-text-black text-2xl ml-2'
                            }`
                        }>
                        {title}
                    </h1>
                    <span 
                        onClick={closeModalReset}>
                        <XMarkIcon className="h6 w-6 text-text-gray cursor-pointer"/>
                    </span>
                </div>

                <div className="text-text-gray flex mb-4 gap-6 justify-center lg:flex-row flex-col">
                    <div className="flex-col flex">
                        <label>Código</label>
                        <input 
                            type="text" required
                            className="border border-border-gray rounded-lg p-1"
                            name="code"
                            value={formData.code}
                            onChange={handleChange}
                        />
                        {errors.code && <p className="text-text-red">{errors.code}</p>}
                    </div>
                    
                    <div className="flex-col flex">
                        <label>Nombre</label>
                        <input 
                            type="text" required
                            className="border border-border-gray rounded-lg p-1"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        {errors.name && <p className="text-text-red">{errors.name}</p>}
                    </div>                
                </div>

                <div className="text-text-gray flex mb-4 gap-6 justify-center lg:flex-row flex-col">
                    <div className=" flex-col flex">
                        <label>Categoria</label>
                        <select 
                            className="border border-border-gray rounded-lg p-1 w-40 mr-6" 
                            name="category" required
                            onChange={handleChange} 
                            value={formData.category} >
                            <option ></option>
                            {dataCategories.map(category => (
                                <option 
                                    key={category.id} 
                                    value={category.id}>{category.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex-col flex">
                        <label>Precio</label>
                        <input 
                            type="number" required
                            className="border border-border-gray rounded-lg p-1"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                        />
                        {errors.price && <p className="text-text-red">{errors.price}</p>}
                    </div>
                </div>

                <div className="text-text-gray flex mb-4 gap-6 justify-center lg:flex-row flex-col">                  
                    <div className="flex-col flex">
                        <label>% Ganancia</label>
                        <input 
                            type="number" required
                            className="border border-border-gray rounded-lg ml-2 p-1"
                            name="profit"
                            value={formData.profit}
                            onChange={handleChange}
                        />
                        {errors.profit && <p className="text-text-red">{errors.profit}</p>}
                    </div>

                    <div className="flex-col flex">
                        <label>Stock</label>
                        <input 
                            type="number" required
                            className="border border-border-gray rounded-lg mr-4 p-1"
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                        />
                        {errors.stock && <p className="text-text-red">{errors.stock}</p>}
                    </div>
                </div>

                <div className="text-text-gray flex mb-4 gap-6 justify-center lg:flex-row flex-col">
                    <div className="flex flex-col">
                        <label>Modelo</label>
                        <select 
                            className="border border-border-gray rounded-lg mr-6 p-1" 
                            name="mark_model" 
                            onChange={handleChange} 
                            value={formData.mark_model}>
                            <option ></option>
                            {
                                dataModels.map(mark_model => (
                                    <option 
                                        key={mark_model.id} 
                                        value={mark_model.id} >{mark_model.name} ({mark_model.mark.name})</option>
                                ))}  
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label>Transmisión</label>
                        <select className="border border-border-gray rounded-lg mr-4 p-1" name="transmission" 
                            onChange={handleChange} 
                            value={formData.transmission}>
                            <option value=""></option>
                            <option value="Automático">Automático</option>
                            <option value="Mecánico">Mecánico</option>
                        </select>
                    </div>
                </div>

                <div className="text-text-gray flex mb-4 gap-6 justify-center lg:flex-row flex-col">
                    <div className="flex flex-col">
                        <label>Imagenes</label>
                        <input 
                            type="text"
                            className="border border-border-gray rounded-lg p-1"
                            name="images"
                            value={formData.images} 
                            onChange={addImage}/>
                    </div>
                    <div className="flex-col flex">
                        <label>Descripción</label>
                        <textarea 
                            className="border border-border-gray rounded-lg p-1"
                            name="description" required
                            value={formData.description}
                            onChange={handleChange}/>
                        {errors.description && <p className="text-danger">{errors.description}</p>}
                    </div>             
                </div>

                <div className="text-text-gray flex mb-4 gap-6 justify-end lg:mr-20 mr-6">

                    {
                        !editDataProduct ? 
                            <input 
                                type="reset" 
                                value='Cancelar' 
                                onClick={closeModalReset}
                                className="rounded-lg bg-btn-red p-2 text-text-ligth cursor-pointer"/>
                            : null
                    }

                    <input 
                        type="submit" 
                        value='Guardar'
                        className="rounded-lg bg-btn-style p-2 text-text-ligth cursor-pointer"/>

                    {
                        editDataProduct ? 
                            <input 
                                type="button" 
                                value='Cotizar'
                                onClick={()=> {handleClickCotizar(formData.id)}}
                                className="rounded-lg bg-btn-gray p-2 text-text-ligth cursor-pointer"/>
                            : null
                    }
                </div>

                {
                    editDataProduct 
                        ? <div className="text-text-gray flex mb-4 gap-6 justify-center lg:flex-row flex-col">
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
                                            datasQuotation.length === 0 
                                                ? <tr>
                                                    <td 
                                                        colSpan="6" 
                                                        className="text-center">
                                                        No hay cotizaciones
                                                    </td>
                                                </tr>
                                                : datasQuotation?.map( quotation => (
                                                    <tr 
                                                        key={quotation.id} className='border-b'>
                                                        <td className='px-2 py-2'>{quotation.provider.name}</td>
                                                        <td className='px-2 py-2'>{quotation.price}</td>
                                                        <td className='px-2 py-2'>Descripcion</td>
                                                        <td className="text-center">
                                                            <button 
                                                                type="reset"
                                                                className='bg-btn-red text-text-ligth p-1 rounded-lg'
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

export default Form_add_product;

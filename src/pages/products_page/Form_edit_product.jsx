import { useEffect, useState } from "react";
import { useUSerContext } from "../../context/context_index";
import { useForm } from "../../hooks/useForm";
import { XMarkIcon, TrashIcon } from "@heroicons/react/24/solid";
import { alertError, alertAdd } from '../../utils/alerts';
import { initialFormProduct } from "../../utils/initialialization";
import Swal from 'sweetalert2';

const Form_edit_product = ({isOpenModalEditProduct, closeModalEditProduct, setEditDataProduct, editDataProduct, openModalCreateQuotation, datasQuotation, deleteQuotation}) => {
    
    const {dataModels, dataCategories, urlProducts, load_data_products} = useUSerContext();

    const [formData, handleChange, setFormData] = useForm(initialFormProduct);

    useEffect(()=>{
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
    }, [editDataProduct]);

    //---Edit Products---//
    const editProduct = (formData) => {
        let data = JSON.stringify(formData);
        fetch(`${urlProducts}${editDataProduct.id}/`, {
            method: "put",
            maxBodyLength: Infinity,
            body: data,
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then(response => response.json())
        .then(response => {
            alertAdd('Producto Editado con Éxito');
            load_data_products();  
            setEditDataProduct(null); 
        })
        .catch((error) => {
            console.log(error);
            let erorCodigo= (error.response.data.code);
            alertError(erorCodigo);
            load_data_products(); 
        })
    };

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

    const closeModalReset = () => {
        closeModalEditProduct();
    };

    const handleSubmit = (e)=>{
        e.preventDefault();
        const err= onValidate(formData);
        setErrors(err);        
        if (Object.keys(err).length === 0){
            if (formData.code !== '' && formData.name !== ''  && formData.description !== '' && formData.price !== '' && formData.stock !== '' && formData.category !== ''){
                 if (editDataProduct !== null ){
                    editProduct(formData);
                    setFormData(initialFormProduct);
                    closeModalEditProduct();
                } else {
                    closeModalEditProduct();
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

    const handleClickCotizar =()=>{
        openModalCreateQuotation();
        closeModalEditProduct();
    };

    const handleClickDeleteQuotation =(quotation)=>
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
                deleteQuotation(quotation);
            }
        })
    };

    const handleModalClick = e => e.stopPropagation();

    return (
        <div className={`${isOpenModalEditProduct ? 'bg-white/[90%]  flex flex-col absolute w-full min-h-screen top-0 items-center justify-center flex-wrap z-40' : 'hidden' }`} onClick={closeModalReset}>
            <form 
                className={`${isOpenModalEditProduct && 'bg-white shadow-xl p-6 rounded-lg flex absolute flex-col w-2/5 flex-wrap'}`} 
                onClick={handleModalClick}
                onSubmit={handleSubmit}>
                <div className="flex justify-between mb-6 flex-wrap">
                    <h1 className="text-2xl">Editar Producto</h1>
                    <span onClick={closeModalReset}><XMarkIcon className="h6 w-6 text-gray-400 cursor-pointer"/></span>
                </div>

                <div className="text-gray-400 flex mb-4 gap-6 justify-center">
                    <div className="flex-col flex">
                        <label>Código</label>
                        <input 
                        type="text" required
                        className="border border-gray-300 rounded-lg p-1 focus:outline-none"
                        name="code"
                        value={formData.code}
                        onChange={handleChange}
                        />
                        {errors.code && <p className="text-red-500">{errors.code}</p>}
                    </div>
                    
                    <div className="flex-col flex">
                        <label>Nombre</label>
                        <input 
                        type="text" required
                        className="border border-gray-300 rounded-lg p-1 focus:outline-none"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        />
                        {errors.name && <p className="text-red-500">{errors.name}</p>}
                    </div>                
                </div>

                <div className="text-gray-400 flex mb-4 gap-6 justify-center">
                    <div className=" flex-col flex">
                        <label>Categoria</label>
                        <select 
                        className="border border-gray-300 rounded-lg p-1 w-40 mr-6" 
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
                        className="border border-gray-300 rounded-lg p-1 focus:outline-none"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        />
                        {errors.price && <p className="text-red-500">{errors.price}</p>}
                    </div>
                </div>

                <div className="text-gray-400 flex mb-4 gap-6  justify-center">
                    
                    <div className="flex-col flex">
                        <label>% Ganancia</label>
                        <input 
                        type="number" required
                        className="border border-gray-300 rounded-lg ml-2 p-1 focus:outline-none"
                        name="profit"
                        value={formData.profit}
                        onChange={handleChange}
                        />
                        {errors.profit && <p className="text-red-500">{errors.profit}</p>}
                    </div>

                    <div className="flex-col flex">
                        <label>Stock</label>
                        <input 
                        type="number" required
                        className="border border-gray-300 rounded-lg mr-4 p-1 focus:outline-none"
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        />
                        {errors.stock && <p className="text-red-500">{errors.stock}</p>}
                    </div>
                </div>

                <div className="text-gray-400 flex mb-4 gap-6  justify-center">
                    <div className="flex flex-col">
                        <label>Modelo</label>
                        <select 
                        className="border border-gray-300 rounded-lg mr-6 p-1" 
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
                        <select className="border border-gray-300 rounded-lg mr-4 p-1" name="transmission" 
                        onChange={handleChange} 
                        value={formData.transmission}>
                            <option value=""></option>
                            <option value="Automático">Automático</option>
                            <option value="Mecánico">Mecánico</option>
                        </select>
                    </div>
                </div>

                <div className="text-gray-400 flex mb-4 gap-6  justify-center">
                    <div className="flex flex-col">
                        <label>Imagenes</label>
                        <input 
                        type="text"
                        className="border border-gray-300 rounded-lg p-1 focus:outline-none"
                        name="images"
                        value={formData.images} 
                        onChange={addImage}/>
                    </div>
                    <div className="flex-col flex">
                        <label>Descripción</label>
                        <textarea 
                        className="border border-gray-300 rounded-lg p-1"
                        name="description" required
                        value={formData.description}
                        onChange={handleChange}/>
                        {errors.description && <p className="text-danger">{errors.description}</p>}
                    </div>             
                </div>

                <div className="text-gray-400 flex mb-4 gap-6 justify-end mr-6">
                    <input 
                    type="submit" 
                    value='Guardar' 
                    onClick={closeModalReset}
                    className="rounded-lg bg-indigo-500 p-2 text-white cursor-pointer"/>
                    <input 
                    type="button" 
                    value='Cotizar'
                    onClick={()=> {handleClickCotizar(formData.id)}}
                    className="rounded-lg bg-gray-400 p-2 text-white cursor-pointer"/>

                </div>

                <div className="text-gray-400 flex mb-4 gap-6 justify-end mr-6 mt-2">
                    <table className={`${isOpenModalEditProduct && 'bg-white w-full'}`}>
                        <thead>
                            <tr className='bg-indigo-500 text-white px-2 py-2'>
                                <th className='px-2 py-2 font-medium'>Proveedor</th>
                                <th className='px-2 py-2 font-medium'>Precio</th>
                                <th className='px-2 py-2 font-medium'>Descripción</th>
                                <th className='px-2 py-2 font-medium'>Acciones</th>
                            </tr>
                        </thead>

                        <tbody className='bg-white'>
                            {   
                                datasQuotation.length === 0 ? <tr><td colSpan="6" className="text-center">No hay cotizaciones</td></tr>
                                :datasQuotation?.map( quotation => (
                                    <tr key={quotation.id} className='border-b'>
                                        <td className='px-2 py-2'>{quotation.provider.name}</td>
                                        <td className='px-2 py-2'>{quotation.price}</td>
                                        <td className='px-2 py-2'>Descripcion</td>
                                        <td className="text-center">
                                            <button 
                                                type="reset"
                                                className='bg-red-500 text-white p-1 rounded-lg'
                                                onClick={() => handleClickDeleteQuotation(quotation.id)}
                                                ><TrashIcon className='h4 w-4'/>
                                            </button>          
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody> 
                    </table>
                </div>            
            </form>  
        </div>
    );
}

export default Form_edit_product;

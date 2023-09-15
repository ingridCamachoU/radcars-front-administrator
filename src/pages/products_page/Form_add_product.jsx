import { XMarkIcon } from "@heroicons/react/24/solid";
import { useForm } from "../../hooks/useForm";
import { useUSerContext } from "../../context/context_index";
import Swal from 'sweetalert2';
import { useState } from "react";

const initialForm ={
    "code": "",
    "name": "",
    "description": "",
    "price": "",
    "stock": "",
    "profit": "30",
    "category": "",
    "transmission": "",
    "mark_model": "",
    "images": [],
};

const Form_add_product = ({isOpenModalAddProduct, closeModal}) => {

    const {urlProducts, load_data_products, dataModels, dataCategories} = useUSerContext();

    const [formData, handleChange, setFormData, handleReset] = useForm(initialForm);

     //---Alert Error---//
     const alertError = (erorCodigo) =>{
        Swal.fire({
            text: erorCodigo,
            icon: 'error',
            confirmButtonText: 'Ok'
        });
    };

      //---Alert Add---//
      const alerAdd = (title) =>{
        Swal.fire({
            text: title,
            icon: 'success',
            confirmButtonText: 'Ok'
        });

    };

       //---Create New Products---//
    const addProduct = (formData) => {
        let data = JSON.stringify(formData);
        fetch(urlProducts, {
            method: "post",
            maxBodyLength: Infinity,
            body: data,
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then(response => {  
            response.json()
            alerAdd('Producto Agregado');
            load_data_products();  
        })
        .catch((error) => {
            console.log(error);
            let erorCodigo= (error.response.data.code);
            alertError(erorCodigo)
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

    const err= onValidate(formData);

    const closeModalReset = () => {
        closeModal();
        handleReset();
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        setErrors(err);        
        closeModalReset();
        if (Object.keys(err).length === 0){
            addProduct(formData);
            setErrors('');
        } 
    };
    
    const addImage=(e)=>{
        const {name, value}= e.target;
        setFormData({
            ...formData, 
            [name]:[value],
        });
    }

    const handleModalClick = e => e.stopPropagation();

    return (
        <div className={`${isOpenModalAddProduct ? 'bg-white/[90%]  flex flex-col absolute w-full min-h-screen top-0 items-center justify-center flex-wrap z-40' : 'hidden' }`} onClick={closeModalReset}>
            <form 
                className={`${isOpenModalAddProduct && 'bg-white shadow-xl p-6 rounded-lg flex absolute flex-col w-2/5 flex-wrap'}`} 
                onClick={handleModalClick}
                onSubmit={handleSubmit}>
                <div className="flex justify-between mb-6 flex-wrap">
                    <h1 className="text-2xl">Crear Producto</h1>
                    <span onClick={closeModalReset}><XMarkIcon className="h6 w-6 text-gray-400"/></span>
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
                    type="reset" 
                    value='Cancelar' 
                    onClick={closeModalReset}
                    className="rounded-lg bg-red-500 p-2 text-white"/>
                    <input 
                    type="submit" 
                    value='Guardar'
                    className="rounded-lg bg-indigo-500 p-2 text-white"/>

                </div>
            </form>
        
        </div>
    );
};

export default Form_add_product;

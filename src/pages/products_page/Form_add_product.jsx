import { XMarkIcon } from "@heroicons/react/24/solid";
import { useForm } from "../../hooks/useForm";
import { useUSerContext } from "../../context/context_index";
import { useContext, useState } from "react";
import { alertAdd, alertError } from "../../utils/alerts";
import { initialFormProduct } from "../../utils/initialialization";
import { DarkMode } from "../../context/DarkMode";

const Form_add_product = ({isOpenModalAddProduct, closeModalAddProduct}) => {

    const {urlProducts, load_data_products, dataModels, dataCategories} = useUSerContext();

    const [formData, handleChange, setFormData] = useForm(initialFormProduct);

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
        .then(response => response.json())
        .then(response => {  
            alertAdd('Producto Agregado');
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
        closeModalAddProduct();
        setFormData(initialFormProduct);
    };

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
    };

    const handleModalClick = e => e.stopPropagation();

    const {darkMode} = useContext(DarkMode);

    return (
        <div 
        className={`${isOpenModalAddProduct ? 'flex flex-col top-0 items-center justify-center flex-wrap z-40 w-full min-h-screen overflow-auto fixed' : 'hidden'} ${darkMode ? 'bg-[#000000]/[90%]': 'bg-white/[90%]'}`}
        onClick={closeModalReset}>
            <form 
                className={`${isOpenModalAddProduct && ' shadow-xl lg:p-4 rounded-lg flex absolute flex-col lg:w-[600px] flex-wrap md:w-4/6 sm:w-4/6 w-10/12 p-4  top-16'} ${darkMode ? 'bg-[#212130]': 'bg-white'}`}
                onClick={handleModalClick}
                onSubmit={handleSubmit}>
                <div className="flex justify-between mb-6 flex-wrap mt-0 sm:mt-4">
                    <h1 
                    className={`${darkMode ? 'text-white text-2xl ml-2' : 'text-black text-2xl ml-2'}`}>Crear Producto</h1>
                    <span onClick={closeModalReset}><XMarkIcon className="h6 w-6 text-gray-400 cursor-pointer"/></span>
                </div>

                <div className="text-gray-400 flex mb-4 gap-6 justify-center lg:flex-row flex-col">
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

                <div className="text-gray-400 flex mb-4 gap-6 justify-center lg:flex-row flex-col">
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

                <div className="text-gray-400 flex mb-4 gap-6 justify-center lg:flex-row flex-col">
                    
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

                <div className="text-gray-400 flex mb-4 gap-6 justify-center lg:flex-row flex-col">
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

                <div className="text-gray-400 flex mb-4 gap-6 justify-center lg:flex-row flex-col">
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

                <div className="text-gray-400 flex mb-4 gap-6 justify-end lg:mr-20 mr-6">
                    <input 
                    type="reset" 
                    value='Cancelar' 
                    onClick={closeModalReset}
                    className="rounded-lg bg-red-500 p-2 text-white cursor-pointer"/>
                    <input 
                    type="submit" 
                    value='Guardar'
                    className="rounded-lg bg-indigo-500 p-2 text-white cursor-pointer"/>

                </div>
            </form>   
        </div>
    );
};

export default Form_add_product;

import { DarkMode } from "../../context/DarkMode";
import { useUSerContext } from "../../context/context_index";
import { useForm } from "../../hooks/useForm";
import { initialFormQuotation } from "../../utils/initialialization";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useContext, useState } from "react";

const Form_add_quotation = ({isOpenModalCreateQuotation, closeModalCreateQuotation, load_data_quotation, editDataProduct, addQuotation}) => {

    const [formData, handleChange, setFormData] = useForm(initialFormQuotation);
    const {dataProviders} = useUSerContext()

    const [errors, setErrors] = useState({});

    const onValidate = (formData)=>{
        let errors = {};
        let regexPrice = /^[0-9]+$/;

        if(!regexPrice.test(formData.price)){
            errors.price= 'El campo "Precio" no debe estar vacio.';
        }

        if (!formData.provider.trim()){
            errors.provider= 'El campo "Proveedor" no debe ser vacio.';
        }
        return errors;
    }

    const handleSubmit = (e)=>{
        e.preventDefault();

        const err= onValidate(formData);
        setErrors(err)
        
        formData.product= editDataProduct.id 

        if (Object.keys(err).length === 0){
            if (formData.product !== '' && formData.provider !== ''  && formData.price !== '' ){
                addQuotation(formData);
                setFormData(initialFormQuotation);
                closeModalCreateQuotation();
            }
        }else{
            setErrors(err);
        }
        setFormData(initialFormQuotation);
        load_data_quotation(editDataProduct);
    };

     const closeModalReset = () => {
        closeModalCreateQuotation();
        setFormData(initialFormQuotation);
    };

    const handleModalClick= e => e.stopPropagation();

    const {darkMode} = useContext(DarkMode);

    return (
        <div 
        className={`${isOpenModalCreateQuotation ? 'flex flex-col top-0 items-center justify-center flex-wrap z-40 w-full min-h-screen overflow-auto fixed' : 'hidden'} ${darkMode ? 'bg-[#000000]/[90%]': 'bg-white/[90%]'}`}
        onClick={closeModalReset}>
                <form 
                    className={`${isOpenModalCreateQuotation && ' shadow-xl lg:p-4 rounded-lg flex absolute flex-col lg:w-[600px] flex-wrap md:w-4/6 sm:w-4/6 w-10/12 p-4  top-16'} ${darkMode ? 'bg-[#212130]': 'bg-white'}`}
                    onClick={handleModalClick}
                    onSubmit={handleSubmit}>
                    <div className="flex justify-between mb-6 flex-wrap">
                        <h1 
                        className={`${darkMode ? 'text-white text-2xl ml-2' : 'text-black text-2xl ml-2'}`}>Crear Cotización</h1>
                        <span onClick={closeModalReset}><XMarkIcon className="h6 w-6 text-gray-400 cursor-pointer"/></span>
                    </div>

                    <div className="text-gray-400 flex mb-4 gap-6 justify-center lg:flex-row flex-col">
                        <div className="flex-col flex">
                            <label>Proveedor</label>
                            <select 
                                className="border border-gray-300 rounded-lg p-1 w-40 mr-6" 
                                name="provider" required
                                onChange={handleChange} 
                                value={formData.provider} >
                                    <option ></option>
                                    {dataProviders.map(provider => (
                                        <option 
                                        key={provider.id} 
                                        value={provider.id}>{provider.name}</option>
                                        ))}
                            </select>
                            {errors.provider && <p className="text-red-500">{errors.provider}</p>}
                        </div>
                        
                        <div className="flex-col flex">
                            <label>Precio</label>
                            <input 
                            type="text" required
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
                            <label>Descripción</label>
                            <textarea 
                            className="border border-gray-300 rounded-lg p-1"
                            type='text'
                            />
                        </div>

                        <div className="text-gray-400 flex mb-4 gap-4 justify-end items-end flex-wrap">
                            <input 
                            type="reset" 
                            value='Cancelar' 
                            onClick={closeModalReset}
                            className="rounded-lg bg-red-500 p-2 text-white cursor-pointer h-10"/>
                            <input 
                            type="submit" 
                            value='Guardar'
                            className="rounded-lg bg-indigo-500 p-2 text-white cursor-pointer h-10"/>
                    </div>
                                    
                    </div>
                    
                </form>
        </div>
    );
}

export default Form_add_quotation;

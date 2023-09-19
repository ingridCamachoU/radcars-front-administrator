import { useUSerContext } from "../../context/context_index";
import { useForm } from "../../hooks/useForm";
import { initialFormQuotation } from "../../utils/initialialization";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

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

    return (
        <div className={`${isOpenModalCreateQuotation ? 'bg-white/[90%]  flex flex-col absolute w-full min-h-screen top-0 items-center justify-center flex-wrap z-40' : 'hidden' }`} onClick={closeModalReset}>
                <form 
                    className={`${isOpenModalCreateQuotation && 'bg-white shadow-xl p-6 rounded-lg flex absolute flex-col w-2/5 flex-wrap'}`} 
                    onClick={handleModalClick}
                    onSubmit={handleSubmit}>
                    <div className="flex justify-between mb-6 flex-wrap">
                        <h1 className="text-2xl">Crear Cotización</h1>
                        <span onClick={closeModalReset}><XMarkIcon className="h6 w-6 text-gray-400 cursor-pointer"/></span>
                    </div>

                    <div className="text-gray-400 flex mb-4 gap-6 justify-center">
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

                    <div className="text-gray-400 flex mb-4 gap-6 justify-center">
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

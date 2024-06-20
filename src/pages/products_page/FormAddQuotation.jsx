import { DarkMode } from "../../context/DarkMode";
import { useForm } from "../../hooks/useForm";
import { initialFormQuotation } from "../../utils/initialialization";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useContext, useState } from "react";
import { endPoints } from "../../services/endPoints/endPoints";
import { helpAxios } from "../../services/helpAxios";

// eslint-disable-next-line react/prop-types
const FormAddQuotation = ({ dataProvider, isOpenModalCreateQuotation, setIsOpenModalCreateQuotation, editDataProduct }) => {

    const [formData, handleChange, setFormData] = useForm(initialFormQuotation);

    const [errors, setErrors] = useState({});

    const { darkMode, token } = useContext(DarkMode);

    const onValidate = (formData)=>{
        let errors = {};
        let regexPrice = /^[0-9]+$/;
        let regexProvider = /^[0-9]+$/;

        if(!regexPrice.test(formData.price)){
            errors.price= 'El campo "Precio" no debe estar vacio.';
        }

        if(!regexProvider.test(formData.provider_id)){
            errors.provider_id= 'El campo "Provedor" no debe estar vacio.';
        }
        return errors;
    };

    const handleSubmit = (e)=>{
        e.preventDefault();

        const err= onValidate(formData);
        setErrors(err);

        formData.product_id = editDataProduct.id 

        if (Object.keys(err).length === 0){
            if (formData.product !== '' && formData.provider !== ''  && formData.price !== '' ){
                const config = {
                    url: endPoints.quotations.getQuotations(editDataProduct?.id),
                    method: 'POST',
                    body: formData,
                    title: 'Cotización Agregada', 
                    icon: 'success',
                    token: token
                };
                helpAxios(config);
                setFormData(initialFormQuotation);
                setIsOpenModalCreateQuotation(false);
            }
        }else{
            setErrors(err);
        }
        setFormData(initialFormQuotation);
    };

    const closeModalReset = () => {
        setIsOpenModalCreateQuotation(false);
        setFormData(initialFormQuotation);
    };

    const handleModalClick= e => e.stopPropagation();


    return (
        <div 
            className={
                `${isOpenModalCreateQuotation 
                    ? 'flex flex-col top-0 items-center justify-center flex-wrap z-40 w-full min-h-screen overflow-auto fixed' 
                    : 'hidden'} ${darkMode 
                    ? 'bg-modal-dark'
                    : 'bg-modal-ligth'
                }`
            }
            onClick={closeModalReset}>
            <form 
                className={
                    `${isOpenModalCreateQuotation && ' shadow-xl lg:p-8 rounded-lg flex absolute flex-col lg:w-[600px] flex-wrap md:w-4/6 sm:w-4/6 w-10/12 p-4  top-16'} ${darkMode 
                        ? 'bg-background-dark_medium'
                        : 'bg-background-ligth'
                    }`
                }
                onClick={handleModalClick}
                onSubmit={handleSubmit}>
                <div className="flex justify-between mb-6 flex-wrap">
                    <h1 
                        className={
                            `${darkMode 
                                ? 'text-text-ligth text-2xl ml-2' 
                                : 'text-text-dark text-2xl ml-2'
                            }`
                        }>
                        Crear Cotización
                    </h1>
                    <span 
                        className={
                            `${darkMode 
                                ? 'text-text-ligth' 
                                : 'text-text-dark'
                            }`
                        }
                        onClick={closeModalReset}>
                        <XMarkIcon className="h6 w-6  cursor-pointer"/>
                    </span>
                </div>

                <div 
                    className={
                        `${darkMode 
                            ? 'text-text-ligth flex mb-4 gap-6 justify-center lg:flex-row flex-col w-full' 
                            : 'text-text-dark flex mb-4 gap-6 justify-center lg:flex-row flex-col w-full'
                        }`
                    }>
                    <div className="flex-col flex w-1/2">
                        <label>Proveedor</label>
                        <select 
                            className="border border-border-gray rounded-lg p-1 w-full mr-6 text-text-dark" 
                            name="provider_id" required
                            onChange={handleChange} 
                            value={formData.provider_id}
                        >
                            <option ></option>
                            {dataProvider?.data?.map(provider_id => (
                                <option 
                                    key={provider_id.id} 
                                    value={provider_id.id}>{provider_id.name}</option>
                            ))}
                        </select>
                        {errors.provider && <p className="text-text-red">{errors.provider}</p>}
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

                <div 
                    className={
                        `${darkMode 
                            ? 'text-text-ligth flex mb-4 gap-6 justify-center lg:flex-row flex-col w-full' 
                            : 'text-text-dark flex mb-4 gap-6 justify-center lg:flex-row flex-col w-full'
                        }`
                    }>
                    <div className="flex-col flex w-1/2">
                        <label>Descripción</label>
                        <textarea 
                            className="border border-border-gray rounded-lg p-1 text-text-dark"
                            type='text'
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>

                    <div className=" flex mb-4 gap-4 justify-end items-end flex-wrap w-1/2">
                        <input 
                            type="reset" 
                            value='Cancelar' 
                            onClick={closeModalReset}
                            className="rounded-lg bg-btn-red p-2 text-text-ligth cursor-pointer hover:bg-btn-redHover h-10"/>
                        <input 
                            type="submit" 
                            value='Guardar'
                            className="rounded-lg bg-btn-style hover:bg-btn-styleHover p-2 text-text-ligth cursor-pointer h-10"/>
                    </div>
                                
                </div>
                
            </form>
        </div>
    );
}

export default FormAddQuotation;

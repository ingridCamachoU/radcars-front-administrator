import { useContext, useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm";
import { initialFormProv } from "../../utils/initialialization";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { DarkMode } from "../../context/DarkMode";
import { endPoints } from "../../services/endPoints/endPoints";
import { helpAxios } from "../../services/helpAxios";

// eslint-disable-next-line react/prop-types
const FormProviders = ({ setEditDataProv, editDataProv, isOpenModalAddProv,  setIsOpenModalAddProv, title, loadDataProvider }) => {

    const [ formData, handleChange, setFormData ] = useForm(initialFormProv);

    const [errors, setErrors] = useState({});

    const onValidate = (formData) => {
        let errors = {};
        let regexNit =  /^[0-9]+$/;
        let regexName = /^([0-9-A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]){2,20}$/;
        let regexContact =  /^[0-9]+$/;
        let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;

        if (!formData.nit.trim()){
            errors.nit= 'El campo "Nit" no debe ser vacio.';
        }else if(!regexNit.test(formData.nit)){
            errors.nit= 'El campo "Nit" es incorrecto, solo acepta números.';
        }

        if (!formData.name.trim()){
            errors.name= 'El campo "Nombre" no debe ser vacio.';
        }else if(!regexName.test(formData.name)){
            errors.name= 'El campo "Nombre" es incorrecto.';
        }

        if (!formData.contact.trim()){
            errors.contact= 'El campo "Contacto" no debe ser vacio.';
        }else if(!regexContact.test(formData.contact)){
            errors.contact= 'El campo "Contacto" solo acepta números.';
        }

        if (!formData.email.trim()){
            errors.email= 'El campo "Email" no debe ser vacio.';
        }else if(!regexEmail.test(formData.email)){
            errors.email= 'El campo "Email" es incorrecto';
        }

        return errors;
    }

    useEffect(() => {
        if( editDataProv !== null){
            setFormData(editDataProv);
        } else{
            setFormData(initialFormProv);
        }
    },[editDataProv]);

    const handleSubmit = (e)=>{
        e.preventDefault();

        const err = onValidate(formData);
        setErrors(err)

        if (Object.keys(err).length === 0){
            if (formData.nit !== '' && formData.name !== ''  && formData.contact !== '' && formData.email !== ''){
                if (editDataProv !== null){
                    const config = {
                        url: endPoints.providers.updateProviders(editDataProv?.id),
                        method: 'PUT',
                        body: formData,
                        title: 'Proveedor editado con éxito', 
                        icon: 'success',
                        loadData: loadDataProvider
                    };
                    helpAxios(config);
                    setFormData(initialFormProv);
                    setEditDataProv(null)
                    setIsOpenModalAddProv(false);
                    setErrors('');
                    
                } else {
                    const config = {
                        url: endPoints.providers.getProviders,
                        method: 'POST',
                        body: formData,
                        title: 'Proveedor agregado', 
                        icon: 'success',
                        loadData: loadDataProvider
                    }
                    helpAxios(config);
                    setFormData(initialFormProv);
                    setIsOpenModalAddProv(false);
                }
            } 
        }else{
            setErrors(err);
        }
    };

    const handleModalClick = e => e.stopPropagation();

    const closeModalReset = () => {
        setEditDataProv(null);
        setIsOpenModalAddProv(false);
        setFormData(initialFormProv);
    };

    const {darkMode} = useContext(DarkMode);

    return (
        <div 
            className={
                `${isOpenModalAddProv 
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
                    `${isOpenModalAddProv && 'shadow-xl lg:p-4 rounded-lg flex absolute flex-col lg:w-[600px] flex-wrap md:w-4/6 sm:w-4/6 w-10/12 p-4 top-16'} ${darkMode 
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
                        <label>Nit</label>
                        <input 
                            type="text" required
                            className="border border-border-gray rounded-lg p-1"
                            name="nit"
                            value={formData.nit}
                            onChange={handleChange}
                        />
                        {errors.nit && <p className="text-text-red">{errors.nit}</p>}
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
                    <div className="flex-col flex">
                        <label>Contacto</label>
                        <input 
                            type="text" required
                            className="border border-border-gray rounded-lg p-1"
                            name="contact"
                            value={formData.contact}
                            onChange={handleChange}
                        />
                        {errors.contact && <p className="text-text-red">{errors.contact}</p>}
                    </div>
                    
                    <div className="flex-col flex">
                        <label>Email</label>
                        <input 
                            type="text" required
                            className="border border-border-gray rounded-lg p-1"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <p className="text-text-red">{errors.email}</p>}
                    </div>                
                </div>
                <div className="text-text-gray flex mb-4 gap-6 justify-end lg:mr-20 mr-4">
                    <input 
                        type="reset" 
                        value='Cancelar' 
                        onClick={closeModalReset}
                        className="rounded-lg bg-btn-red p-2 text-text-ligth cursor-pointer"/>
                    <input 
                        type="submit" 
                        value='Guardar'
                        className="rounded-lg bg-btn-style p-2 text-text-ligth cursor-pointer"/>
                </div>
            </form>
        </div>
    )
}

export default FormProviders;

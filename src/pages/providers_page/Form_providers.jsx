import { useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm";
import { initialFormProv } from "../../utils/initialialization";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useUSerContext } from "../../context/context_index";
import { alertError, alertAdd } from '../../utils/alerts';

const Form_providers = ({setEditDataProv, editDataProv, isOpenModalAddProv, closeModalAddProv, setIsOpenModalAddProv}) => {

    const [formData, handleChange, setFormData] = useForm(initialFormProv);
    const {urlProviders, load_data_providers} = useUSerContext();

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

      //---Create New Provider---//
    const addProvider = (formData) => {
        let data = JSON.stringify(formData);
        fetch(urlProviders, {
            method: "post",
            maxBodyLength: Infinity,
            body: data,
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then(response => response.json())
        .then(response => {  
            alertAdd('Proveedor Agregado');
            setIsOpenModalAddProv(false)
            load_data_providers();  
        })
        .catch((error) => {
            console.log(error);
            let erorCodigo= (error.response.data.code);
            alertError(erorCodigo)
            load_data_providers(); 
        })
       
    };

    //---Edit Provider---//
    const editProvider = (formData) => {
        let data = JSON.stringify(formData);
        fetch(`${urlProviders}${editDataProv.id}/`, {
            method: "put",
            maxBodyLength: Infinity,
            body: data,
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then(response => response.json())
        .then(response => {
            alertAdd('Proveedor Editado con Éxito');
            load_data_providers();  
            setEditDataProv(null); 
        })
        .catch((error) => {
            console.log(error);
            let erorCodigo= (error.response.data.code);
            alertError(erorCodigo);
            load_data_providers(); 
        })
    };

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
                    editProvider(formData);
                    setFormData(initialFormProv);
                    closeModalAddProv();
                    setErrors('');
                    
                } else {
                    addProvider(formData);
                    setFormData(initialFormProv);
                    closeModalAddProv();
                }
            } 
        }else{
            setErrors(err);
        }
    };

    const handleModalClick = e => e.stopPropagation();

    const closeModalReset = () => {
        setIsOpenModalAddProv(false)
        setFormData(initialFormProv);
    };

  return (
        <div className={`${isOpenModalAddProv ? 'bg-white/[90%]  flex flex-col absolute w-full min-h-screen top-0 items-center justify-center flex-wrap z-40' : 'hidden' }`} onClick={closeModalReset}>
            <form 
                className={`${isOpenModalAddProv && 'bg-white shadow-xl p-6 rounded-lg flex absolute flex-col w-2/5 flex-wrap'}`} 
                onClick={handleModalClick}
                onSubmit={handleSubmit}>
                <div className="flex justify-between mb-6 flex-wrap">
                    <h1 className="text-2xl">Crear Producto</h1>
                    <span onClick={closeModalReset}><XMarkIcon className="h6 w-6 text-gray-400 cursor-pointer"/></span>
                </div>

                <div className="text-gray-400 flex mb-4 gap-6 justify-center">
                    <div className="flex-col flex">
                        <label>Nit</label>
                        <input 
                        type="text" required
                        className="border border-gray-300 rounded-lg p-1 focus:outline-none"
                        name="nit"
                        value={formData.nit}
                        onChange={handleChange}
                        />
                        {errors.nit && <p className="text-red-500">{errors.nit}</p>}
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
                    <div className="flex-col flex">
                        <label>Contacto</label>
                        <input 
                        type="text" required
                        className="border border-gray-300 rounded-lg p-1 focus:outline-none"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        />
                        {errors.contact && <p className="text-red-500">{errors.contact}</p>}
                    </div>
                    
                    <div className="flex-col flex">
                        <label>Email</label>
                        <input 
                        type="text" required
                        className="border border-gray-300 rounded-lg p-1 focus:outline-none"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        />
                        {errors.email && <p className="text-red-500">{errors.email}</p>}
                    </div>                
                </div>
                <div className="text-gray-400 flex mb-4 gap-6 justify-end mr-6">
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
    )
}

export default Form_providers;

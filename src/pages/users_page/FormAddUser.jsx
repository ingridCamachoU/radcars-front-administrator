import { useContext, useEffect, useState } from "react";
import { DarkMode } from "../../context/DarkMode";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useForm } from "../../hooks/useForm";
import { initialFormUser } from "../../utils/initialialization";
import { endPoints } from "../../services/endPoints/endPoints";
import { helpAxios } from "../../services/helpAxios";
import { alert } from "../../utils/alerts";

// eslint-disable-next-line react/prop-types
const FormAddUser = ({ editDataUser,isOpenModalAddUser, loadDataUser, setEditDataUser, setIsOpenModalAddUser, title }) => {

    const [ formData, handleChange, setFormData ] = useForm(initialFormUser);
    const { darkMode, token, canEditLocally } = useContext(DarkMode);
    const [ errors, setErrors ] = useState({});

    const onValidate = (formData) => {
        let errors = {};
        let regexCC =  /^[0-9]+$/;
        let regexName = /^([0-9-A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]){2,20}$/;
        let regexPhone =  /^[0-9]+$/;

        if (!formData.cc.trim()){
            errors.cc= 'El campo "CC" no debe ser vacio.';
        }else if(!regexCC.test(formData.cc)){
            errors.cc= 'El campo "CC" es incorrecto, solo acepta números.';
        }

        if (!formData.name.trim()){
            errors.name= 'El campo "Nombre" no debe ser vacio.';
        }else if(!regexName.test(formData.name)){
            errors.name= 'El campo "Nombre" es incorrecto.';
        }

        if (!formData.phone.trim()){
            errors.phone= 'El campo "Telefono" no debe ser vacio.';
        }else if(!regexPhone.test(formData.phone)){
            errors.phone= 'El campo "Telefono" solo acepta números.';
        }

        return errors;
    }

    useEffect(() => {
        if( editDataUser !== null){
            const copyData = {
                "cc": editDataUser?.cc,
                "name": editDataUser?.name,   
                "phone": editDataUser?.phone,
                "address": editDataUser?.address,
            }
            setFormData(copyData);
        } else{
            setFormData(initialFormUser);
        }
    },[editDataUser]);

    const handleSubmit = (e)=>{
        e.preventDefault();

        const err = onValidate(formData);
        setErrors(err)

        if(canEditLocally){
            editDataUser !== null ? alert('No tienes permiso para editar', 'error') :  alert('No tienes permiso para crear', 'error');
            setFormData(initialFormUser);
            setIsOpenModalAddUser(false);
            setErrors('');
        }else{
            if (Object.keys(err).length === 0) {
                const isEdit = editDataUser !== null;
                const config = {
                    url: isEdit ? endPoints.users.updateUser(editDataUser?.id) : endPoints.users.getUser,
                    method: isEdit ? 'PUT' : 'POST',
                    body: formData,
                    title: isEdit ? 'Usuario editado con éxito' : 'Usuario agregado con éxito',
                    icon: 'success',
                    loadData: loadDataUser,
                    token: token
                };
            
                helpAxios(config);
            
                if (isEdit) {
                    setEditDataUser(null);
                }
                
                setFormData(initialFormUser);
                setIsOpenModalAddUser(false);
                setErrors('');
            } else{
                setErrors(err);
            }
        }
        
    };

    const handleModalClick = e => e.stopPropagation();

    const closeModalReset = () => {
        setEditDataUser(null);
        setIsOpenModalAddUser(false);
        setFormData(initialFormUser);
    };

    return (
        <div 
            className={
                `${isOpenModalAddUser 
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
                    `${isOpenModalAddUser && 'shadow-xl lg:p-4 rounded-lg flex absolute flex-col lg:w-[600px] flex-wrap md:w-4/6 sm:w-4/6 w-10/12 p-4 top-16'} ${darkMode 
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
                        {title}
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

                <div className=" flex mb-4 gap-6 justify-center lg:flex-row flex-col">
                    <div className="flex-col flex">
                        <label  className={
                            `${darkMode 
                                ? 'text-text-ligth mb-2' 
                                : 'text-text-dark mb-2'
                            }`
                        }>Nombre y apellido</label>
                        <input 
                            type="text" required
                            className="border border-border-gray rounded-lg p-1"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        {errors.name && <p className="text-text-red">{errors.name}</p>}
                    </div>
                    
                    <div className="flex-col flex">
                        <label className={
                            `${darkMode 
                                ? 'text-text-ligth mb-2' 
                                : 'text-text-dark mb-2'
                            }`
                        }>Identificación</label>
                        <input 
                            type="number" required
                            className="border border-border-gray rounded-lg p-1"
                            name="cc"
                            value={formData.cc}
                            onChange={handleChange}
                        />
                        {errors.cc && <p className="text-text-red">{errors.cc}</p>}
                    </div>                
                </div>

                <div className=" flex mb-4 gap-6 justify-center lg:flex-row flex-col">
                    <div className="flex-col flex">
                        <label className={
                            `${darkMode 
                                ? 'text-text-ligth mb-2' 
                                : 'text-text-dark mb-2'
                            }`
                        }>Telefono</label>
                        <input 
                            type="number" required
                            className="border border-border-gray rounded-lg p-1"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                        {errors.phone && <p className="text-text-red">{errors.phone}</p>}
                    </div>  
                    <div className="flex-col flex">
                        <label className={
                            `${darkMode 
                                ? 'text-text-ligth mb-2' 
                                : 'text-text-dark mb-2'
                            }`
                        }>Dirección</label>
                        <textarea 
                            type="text" required
                            className="border border-border-gray rounded-lg p-1"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                        />
                        {errors.address && <p className="text-text-red">{errors.address}</p>}
                    </div>
                                  
                </div>

                {
                    editDataUser === null ?

                        <div className="flex mb-4 gap-6 justify-center lg:flex-row flex-col">
                            <div className="flex-col flex">
                                <label className={
                                    `${darkMode 
                                        ? 'text-text-ligth mb-2' 
                                        : 'text-text-dark mb-2'
                                    }`
                                }>Correo electrónico</label>
                                <input 
                                    type="email" required
                                    className="border border-border-gray rounded-lg p-1"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                {errors.email && <p className="text-text-red">{errors.email}</p>}
                            </div>

                            <div className="flex-col flex">
                                <label className={
                                    `${darkMode 
                                        ? 'text-text-ligth mb-2' 
                                        : 'text-text-dark mb-2'
                                    }`
                                }>Contraseña</label>
                                <input 
                                    type="password" required
                                    className="border border-border-gray rounded-lg p-1"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                {errors.password && <p className="text-text-red">{errors.password}</p>}
                            </div>                
                        </div>
                        :
                        null
                }
                
                <div className="flex mb-4 gap-6 justify-end lg:flex-row flex-col mt-6 mr-8">
                    <input 
                        type="reset" 
                        value='Cancelar' 
                        onClick={closeModalReset}
                        className="rounded-lg bg-btn-red p-2 text-text-ligth cursor-pointer hover:bg-btn-redHover"/>
                    <input 
                        type="submit" 
                        value='Guardar'
                        className="rounded-lg bg-btn-style p-2 text-text-ligth cursor-pointer hover:bg-btn-styleHover"/>
                </div>    
            </form>
        </div>
    )
}

export default FormAddUser;

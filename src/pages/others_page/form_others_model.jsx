import { XMarkIcon } from "@heroicons/react/24/solid";
import { useForm } from "../../hooks/useForm";
import { useContext, useEffect, useState } from "react";
import { useUSerContext } from "../../context/context_index";
import { DarkMode } from "../../context/DarkMode";
import { addModel, updateModel } from "../../services/models";

// eslint-disable-next-line react/prop-types
export const Form_Model = ({ editDataModel, setEditDataModel, isOpenModalCreateModel, setIsOpenModalCreateModel}) => {

    const initialFormModel ={
        "mark": "",
        "name": "",
    };

    const { load_Models_products, dataMark} = useUSerContext();

    const [formData, handleChange, setFormData] = useForm(initialFormModel);

    const [errors, setErrors] = useState({});

    const onValidate = (formData)=>{
        let regexName = /^([0-9-A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]){5,20}$/;

        if (!formData.name.trim()){
            errors.name= 'El campo "Nombre" no debe ser vacio.';
        }else if(!regexName.test(formData.name)){
            errors.name= 'El campo "Nombre" es incorrecto.';
        }

        return errors;
    };

    useEffect(()=>{
        if( editDataModel !== null){
            const copyData = {
                "mark": editDataModel?.mark?.id,
                "name": editDataModel?.name,
            }
            setFormData(copyData);
        } else{
            setFormData(initialFormModel);
        }
    },[editDataModel]);

    const handleSubmit = (e)=>{
        e.preventDefault();
        const err = onValidate(formData);
        setErrors(err)

        if (Object.keys(err).length === 0){
            
            if (editDataModel !== null){
                updateModel(editDataModel?.id, formData, load_Models_products, setEditDataModel);
                setFormData(initialFormModel);
                setIsOpenModalCreateModel(false);
                setErrors('');
                
            } else {
                addModel(formData, load_Models_products);
                setFormData(initialFormModel);
                setIsOpenModalCreateModel(false);
            }       
        }else{
            setErrors(err);
        }
    };
    
    const handleModalClick = e => e.stopPropagation();

    const closeModalReset = () => {
        setEditDataModel(null);
        setIsOpenModalCreateModel(false);
        setFormData(initialFormModel);
    };

    const {darkMode} = useContext(DarkMode);

    return(

        <div 
            className={
                `${isOpenModalCreateModel 
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
                    `${isOpenModalCreateModel && ' shadow-xl lg:p-4 rounded-lg flex absolute flex-col lg:w-[450px] flex-wrap md:w-4/6 sm:w-4/6 w-10/12 p-4  top-16'
                    } ${darkMode 
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
                        Crear Modelo
                    </h1>
                    <span onClick={closeModalReset}>
                        <XMarkIcon className="h6 w-6 text-text-gray cursor-pointer"/>
                    </span>
                </div>

                <div className="text-text-gray flex mb-4 gap-6 justify-center lg:flex-row flex-col">
                    
                    <div className="flex-col flex">
                        <label>Nombre</label>
                        <input 
                            type="text" required
                            className="border border-border-gray rounded-lg mr-6 p-1 "
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        {errors.name && <p className="text-text-red">{errors.name}</p>}
                    </div>          

                    <div className="flex-col flex">
                        <label>Marca</label>
                        <select 
                            className="border border-border-gray rounded-lg p-1 w-40 mr-6"  
                            name="mark" required
                            onChange={handleChange} 
                            value={formData.mark} >
                            <option ></option>
                            {dataMark.map(mark => (
                                <option key={mark.id} value={mark.id}>{mark.name}</option>
                            ))}
                        </select>
                    </div>            
                </div>

                <div className="text-text-gray flex mb-4 gap-6 justify-end mr-6 lg:mr-20">
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
    );
};

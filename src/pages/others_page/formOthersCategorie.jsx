import { XMarkIcon } from "@heroicons/react/24/solid";
import { useForm } from "../../hooks/useForm";
import { useContext, useEffect, useState } from "react";
import { DarkMode } from "../../context/DarkMode";
import { endPoints } from "../../services/endPoints/endPoints";
import { helpAxios } from "../../services/helpAxios";

// eslint-disable-next-line react/prop-types
export const FormCategorie = ({ editDataCategorie, setEditDataCategorie, isOpenModalCreateCategorie, setIsOpenModalCreateCategorie, loadCategoriesProducts}) => {
    const initialFormCategorie = {
        "name": "",
    };

    const [formData, handleChange, setFormData] = useForm(initialFormCategorie);
    const {darkMode, token } = useContext(DarkMode);

    const [errors, setErrors] = useState({});

    const onValidate = (formData)=>{
        let regexName = /^([0-9-A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]){2,20}$/;

        if (!formData.name.trim()){
            errors.name= 'El campo "Nombre" no debe ser vacio.';
        }else if(!regexName.test(formData.name)){
            errors.name= 'El campo "Nombre" es incorrecto.';
        }

        return errors;
    };

    useEffect(() => {
        if( editDataCategorie !== null){
            setFormData(editDataCategorie);
        } else{
            setFormData(initialFormCategorie);
        }
    },[editDataCategorie]);

    const handleSubmit = (e)=>{
        e.preventDefault();
        const err = onValidate(formData);
        setErrors(err)

        if (Object.keys(err).length === 0) {
            const isEdit = editDataCategorie !== null;
            const config = {
                url: isEdit ? endPoints.categories.updateCategories(editDataCategorie?.id) : endPoints.categories.getCategories,
                method: isEdit ? 'PUT' : 'POST',
                body: formData,
                title: isEdit ? 'Categoría editada con éxito' : 'Categoría agregada con éxito',
                icon: 'success',
                loadData: loadCategoriesProducts,
                token: token
            };
        
            helpAxios(config);
        
            if (isEdit) {
                setEditDataCategorie(null);
            }
            
            setFormData(initialFormCategorie);
            setIsOpenModalCreateCategorie(false);
            setErrors('');
        } else {
            setErrors(err);
        }
    };
    
    const handleModalClick = e => e.stopPropagation();

    const closeModalReset = () => {
        setEditDataCategorie(null);
        setIsOpenModalCreateCategorie(false);
        setFormData(initialFormCategorie);
    };

    return(

        <div 
            className={ 
                `${isOpenModalCreateCategorie 
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
                    `${isOpenModalCreateCategorie && ' shadow-xl lg:p-4 rounded-lg flex absolute flex-col lg:w-[400px] flex-wrap md:w-4/6 sm:w-4/6 w-10/12 p-4  top-16'} ${darkMode 
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
                        }>Crear Categoria</h1>
                    <span 
                        className={
                            `${darkMode 
                                ? 'text-text-ligth' 
                                : 'text-text-black'
                            }`
                        }
                        onClick={closeModalReset} >
                        <XMarkIcon className="h6 w-6  cursor-pointer"/>
                    </span>
                </div>

                <div className=" flex mb-4 gap-6 justify-center lg:flex-row flex-col w-full">
                    
                    <div className="flex-col flex w-full">
                        <label  className={
                            `${darkMode 
                                ? 'text-text-ligth mb-4' 
                                : 'text-text-black mb-4'
                            }`
                        }>Nombre</label>
                        <input 
                            type="text" required
                            className="border border-border-gray rounded-lg p-1 mb-4 pl-2"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        {errors.name && <p className="text-text-red">{errors.name}</p>}
                    </div>                
                </div>

                <div className=" flex mb-4 gap-6 justify-end w-full">
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
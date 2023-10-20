import { XMarkIcon } from "@heroicons/react/24/solid";
import { useForm } from "../../hooks/useForm";
import { useContext, useEffect, useState } from "react";
import { DarkMode } from "../../context/DarkMode";
import { helpAxios } from "../../services/helpAxios";
import { endPoints } from "../../services/endPoints/endPoints";

// eslint-disable-next-line react/prop-types
export const FormMark = ({ editDataMark, setEditDataMark, isOpenModalCreateMark, setIsOpenModalCreateMark, loadMarkProducts}) => {

    const initialFormMark = {
        "name": "",
    };

    const [formData, handleChange, setFormData] = useForm(initialFormMark);

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
        if( editDataMark !== null){
            setFormData(editDataMark);
        } else{
            setFormData(initialFormMark);
        }
    },[editDataMark]);

    const handleSubmit = (e)=>{
        e.preventDefault();
        const err = onValidate(formData);
        setErrors(err)

        if (Object.keys(err).length === 0){
            
            if (editDataMark !== null){

                const config = {
                    url: endPoints.marks.updateMarks(editDataMark?.id),
                    method: 'PUT',
                    body: formData,
                    title: 'Marca editada con éxito', 
                    icon: 'success',
                    loadData: loadMarkProducts
                }
                helpAxios(config);
                setFormData(initialFormMark);
                setIsOpenModalCreateMark(false);
                setErrors('');
                
            } else {
                const config = {
                    url: endPoints.marks.getMarks,
                    method: 'POST',
                    body: formData,
                    title: 'Categoría agregada con éxito', 
                    icon: 'success',
                    loadData: load_data_marks
                }
                helpAxios(config);
                setFormData(initialFormMark);
                setIsOpenModalCreateMark(false);
            }       
        }else{
            setErrors(err);
        }
    };
    
    const handleModalClick = e => e.stopPropagation();

    const closeModalReset = () => {
        setEditDataMark(null);
        setIsOpenModalCreateMark(false);
        setFormData(initialFormMark);
    };

    const {darkMode} = useContext(DarkMode);

    return(

        <div 
            className={
                `${isOpenModalCreateMark 
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
                    `${isOpenModalCreateMark && ' shadow-xl lg:p-4 rounded-lg flex absolute flex-col lg:w-[400px] flex-wrap md:w-4/6 sm:w-4/6 w-10/12 p-4  top-16'} ${darkMode 
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
                        }>Crear Marca</h1>
                    <span onClick={closeModalReset}>
                        <XMarkIcon className="h6 w-6 text-text-gray cursor-pointer"/>
                    </span>
                </div>

                <div className="text-text-gray flex mb-4 gap-6 justify-center lg:flex-row flex-col w-full">
                    
                    <div className="flex-col flex w-full">
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

                <div className="text-text-gray flex mb-4 gap-6 justify-end w-full">
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
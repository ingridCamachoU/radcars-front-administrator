import { XMarkIcon } from "@heroicons/react/24/solid";
import { useForm } from "../../hooks/useForm";
import { useEffect, useState } from "react";
import { useUSerContext } from "../../context/context_index";
import { alertError, alertAdd } from '../../utils/alerts';

export const Form_Model = ({ editDataModel, setEditDataModel, isOpenModalCreateModel, setIsOpenModalCreateModel}) => {

    const initialFormModel ={
        "mark": "",
        "name": "",
    };

    const {urlModels, load_Models_products, dataMark} = useUSerContext();

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

    //---Create New Model---//
    const addModel = (formData) => {
        let data = JSON.stringify(formData);
        fetch(urlModels, {
            method: "post",
            maxBodyLength: Infinity,
            body: data,
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then(response => response.json())
        .then(response => {  
            alertAdd('Modelo agregada');
            setIsOpenModalCreateModel(false);
            load_Models_products();  
        })
        .catch((error) => {
            console.log(error);
            let erorCodigo= (error.response.data.code);
            alertError(erorCodigo);
            load_Models_products(); 
        })
    };

    //---Edit Model---//
    const editModel = (formData) => {
        let data = JSON.stringify(formData);
        fetch(`${urlModels}${editDataModel.id}/`, {
            method: "put",
            maxBodyLength: Infinity,
            body: data,
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then(response => response.json())
        .then(response => {
            alertAdd('Modelo editado con éxito');
            load_Models_products();  
            setEditDataModel(null); 
        })
        .catch((error) => {
            console.log(error);
            let erorCodigo= (error.response.data.code);
            alertError(erorCodigo);
            load_Models_products(); 
        })
    };
    
    const handleSubmit = (e)=>{
        e.preventDefault();
        const err = onValidate(formData);
        setErrors(err)

        if (Object.keys(err).length === 0){
            
            if (editDataModel !== null){

                editModel(formData);
                setFormData(initialFormModel);
                setIsOpenModalCreateModel(false);
                setErrors('');
                
            } else {
                addModel(formData);
                setFormData(initialFormModel);
                setIsOpenModalCreateModel(false);
            }       
        }else{
            setErrors(err);
        }
    };
    
    const handleModalClick = e => e.stopPropagation();

    const closeModalReset = () => {
        setIsOpenModalCreateModel(false);
        setFormData(initialFormModel);
    };

    return(

        <div className={`${isOpenModalCreateModel ? 'bg-white/[90%]  flex flex-col absolute w-full min-h-screen top-0 items-center justify-center flex-wrap z-40' : 'hidden' }`} onClick={closeModalReset}>
            <form 
                className={`${isOpenModalCreateModel && 'bg-white shadow-xl p-6 rounded-lg flex absolute flex-col w-2/6 flex-wrap'}`} 
                onClick={handleModalClick}
                onSubmit={handleSubmit}>
                <div className="flex justify-between mb-6 flex-wrap">
                    <h1 className="text-2xl">Crear Modelo</h1>
                    <span onClick={closeModalReset}><XMarkIcon className="h6 w-6 text-gray-400 cursor-pointer"/></span>
                </div>

                <div className="text-gray-400 flex mb-4 gap-6 justify-center">
                    
                    <div className="flex-col flex justify-center w-full mx-6 my-2">
                        <label>Nombre</label>
                        <input 
                        type="text" required
                        className="border border-gray-300 rounded-lg p-1 w-full focus:outline-none"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        />
                        {errors.name && <p className="text-red-500">{errors.name}</p>}
                    </div>          

                    <div className="flex-col flex justify-center w-full mx-6 my-2">
                        <label>Marca</label>
                        <select className="border border-gray-300 rounded-lg mr-6 p-1 focus:outline-none"  name="mark" required
                        onChange={handleChange} 
                        value={formData.mark} >
                            <option ></option>
                            {dataMark.map(mark => (
                                <option key={mark.id} value={mark.id}>{mark.name}</option>
                                ))}
                        </select>
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
    );
};

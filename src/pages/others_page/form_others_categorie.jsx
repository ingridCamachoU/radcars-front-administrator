import { XMarkIcon } from "@heroicons/react/24/solid";
import { useForm } from "../../hooks/useForm";
import { useEffect, useState } from "react";
import { useUSerContext } from "../../context/context_index";
import { alertError, alertAdd } from '../../utils/alerts';

export const Form_Categorie = ({ editDataCategorie, setEditDataCategorie, isOpenModalCreateCategorie, setIsOpenModalCreateCategorie}) => {
    const initialFormCategorie = {
        "name": "",
    };

    const {urlCategories, load_Categories_products} = useUSerContext();

    const [formData, handleChange, setFormData] = useForm(initialFormCategorie);

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

    //---Create New Categorie---//
    const addCategorie = (formData) => {
        let data = JSON.stringify(formData);
        fetch(urlCategories, {
            method: "post",
            maxBodyLength: Infinity,
            body: data,
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then(response => response.json())
        .then(response => {  
            alertAdd('Categoria agregada');
            setIsOpenModalCreateCategorie(false);
            load_Categories_products();  
            
        })
        .catch((error) => {
            console.log(error);
            let erorCodigo= (error.response.data.code);
            alertError(erorCodigo)
            load_Categories_products(); 
        })
    };

    //---Edit Categorie---//
    const editCategorie = (formData) => {
        let data = JSON.stringify(formData);
        fetch(`${urlCategories}${editDataCategorie.id}/`, {
            method: "put",
            maxBodyLength: Infinity,
            body: data,
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then(response => response.json())
        .then(response => {
            alertAdd('Categoria editada con éxito');
            load_Categories_products();  
            setEditDataCategorie(null); 
        })
        .catch((error) => {
            console.log(error);
            let erorCodigo= (error.response.data.code);
            alertError(erorCodigo);
            load_Categories_products(); 
        })
    };
    
    const handleSubmit = (e)=>{
        e.preventDefault();
        const err = onValidate(formData);
        setErrors(err)

        if (Object.keys(err).length === 0){
            
            if (editDataCategorie !== null){
                editCategorie(formData);
                setFormData(initialFormCategorie);
                setIsOpenModalCreateCategorie(false);
                setErrors('');
                
            } else {
                addCategorie(formData);
                setFormData(initialFormCategorie);
                setIsOpenModalCreateCategorie(false);
            }       
        }else{
            setErrors(err);
        }
    };
    
    const handleModalClick = e => e.stopPropagation();

    const closeModalReset = () => {
        setIsOpenModalCreateCategorie(false);
        setFormData(initialFormCategorie);
    };

    return(

        <div className={`${isOpenModalCreateCategorie ? 'bg-white/[90%]  flex flex-col absolute w-full min-h-screen top-0 items-center justify-center flex-wrap z-40' : 'hidden' }`} onClick={closeModalReset}>
            <form 
                className={`${isOpenModalCreateCategorie && 'bg-white shadow-xl p-6 rounded-lg flex absolute flex-col w-2/6 flex-wrap'}`} 
                onClick={handleModalClick}
                onSubmit={handleSubmit}>
                <div className="flex justify-between mb-6 flex-wrap">
                    <h1 className="text-2xl">Crear Categoria</h1>
                    <span onClick={closeModalReset}><XMarkIcon className="h6 w-6 text-gray-400 cursor-pointer"/></span>
                </div>

                <div className="text-gray-400 flex mb-4 gap-6 justify-center">
                    
                    <div className="flex-col flex justify-center w-full mx-6 my-2">
                        <label>Nombre</label>
                        <input 
                        type="text" required
                        className="border border-gray-300 rounded-lg p-1 focus:outline-none w-full"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        />
                        {errors.name && <p className="text-red-500">{errors.name}</p>}
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
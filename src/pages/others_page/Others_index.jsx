import Layout_base from "../../layout/Layout_base"
import Table_others from "./Table_others";
import { useModal } from "../../hooks/useModal";
import { useUSerContext } from "../../context/context_index";
import { Form_Categorie } from "./form_others_categorie";
import { alertError, alertAdd } from '../../utils/alerts';
import { useState } from "react";
import { Form_Mark } from "./form_others_mark";
import { Form_Model } from "./form_others_model";

const Others_index = () => {

    const [isOpenModalCreateCategorie, openModalCreateCategorie, closeModalCreateCategorie, setIsOpenModalCreateCategorie, isOpenModalCreateMark, setIsOpenModalCreateMark, openModalCreateMark  ] = useModal();

    const {urlCategories, load_Categories_products, urlMarks, load_data_marks, urlModels, load_Models_products} = useUSerContext();

    //Modal Model//
    const [isOpenModalCreateModel, setIsOpenModalCreateModel] = useState(false);

    const openModalCreateModel = () => setIsOpenModalCreateModel(true);
    const closeModalCreateModel = () => setIsOpenModalCreateModel(false);

    //Edit Data//
    const [editDataCategorie, setEditDataCategorie] = useState(null);
    const [editDataMark, setEditDataMark] = useState(null);
    const [editDataModel, setEditDataModel] = useState(null);

    //---Delete Categorie---//
    const deleteCategorie = (id) => {

        let requestOptions = {
            method: 'DELETE',
        };
          
        fetch(`${urlCategories}${id}/`, requestOptions)
    
        .then(response => {
            if(response.status === 409){
                return response.json();
            }else{
                return response.text();
            }
        })
        .then((response) => {
            if(response.message){
                alertWarning('No eliminado!');
            }else{
                alertAdd('La categoria ha sido eliminado');
                load_Categories_products(); 
            }
        })
        .catch((error) => {
            console.log('error:',error);
            alertError('La categoria ha sido asignada a un producto');
            load_Categories_products(); 
        }) 
    };

    //---Delete Mark---//
    const deleteMark = (id) => {

        let requestOptions = {
            method: 'DELETE',
        };
          
        fetch(`${urlMarks}${id}/`, requestOptions)
    
        .then(response => {
            if(response.status === 409){
                return response.json();
            }else{
                return response.text();
            }
        })
        .then((response) => {
            if(response.message){
                alertWarning('No eliminado!');
            }else{
                alertAdd('La marca ha sido eliminada');
                load_data_marks(); 
            }
        })
        .catch((error) => {
            console.log('error:',error);
            alertError('La Marca ha sido asignada a un producto');
            load_data_marks(); 
        })     
    };

    //---Delete Model---//
    const deleteModel = (id) => {

        let requestOptions = {
            method: 'DELETE',
        };
          
        fetch(`${urlModels}${id}/`, requestOptions)
    
        .then((response) => {
            if(response.status=== 409){
                alertWarning('No eliminado, el modelo ha sido asignada a un producto!');
            }else{
                alertAdd('El modelo ha sido eliminado.');
                load_Models_products(); 
            }
        })
        .catch((error) => {
            console.log('error:',error);
            alertError('El modelo ha sido asignado a un producto');
            load_Models_products(); 
        })     
    };

    return (
        <Layout_base>
            <Form_Categorie closeModalCreateCategorie={closeModalCreateCategorie} isOpenModalCreateCategorie={isOpenModalCreateCategorie} editDataCategorie={editDataCategorie} setEditDataCategorie={setEditDataCategorie} setIsOpenModalCreateCategorie={setIsOpenModalCreateCategorie}/>

            <Form_Mark isOpenModalCreateMark={isOpenModalCreateMark} setIsOpenModalCreateMark={setIsOpenModalCreateMark} editDataMark={editDataMark} setEditDataMark={setEditDataMark}/>

            <Form_Model isOpenModalCreateModel={isOpenModalCreateModel} closeModalCreateModel={closeModalCreateModel} editDataModel={editDataModel} setEditDataModel={setEditDataModel} setIsOpenModalCreateModel={setIsOpenModalCreateModel}/>
    
            <div className='lg:relative overflow-x-auto lg:w-4/5 lg:ml-60 lg:mr-8 w-full ml-8 mr-4 mt-6'>
                <Table_others setEditDataCategorie={setEditDataCategorie} deleteCategorie={deleteCategorie} openModalCreateCategorie={openModalCreateCategorie} openModalCreateMark={openModalCreateMark} deleteMark={deleteMark} setEditDataMark={setEditDataMark} openModalCreateModel={openModalCreateModel} setEditDataModel={setEditDataModel} deleteModel={deleteModel}/>  
            </div>      
        </Layout_base>   
    );
};

export default Others_index;

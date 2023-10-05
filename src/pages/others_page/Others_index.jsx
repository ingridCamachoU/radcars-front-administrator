import { useState } from "react";
import Layout_base from "../../layout/Layout_base"
import Table_others from "./Table_others";
import { useModal } from "../../hooks/useModal";
import { Form_Categorie } from "./form_others_categorie";
import { Form_Mark } from "./form_others_mark";
import { Form_Model } from "./form_others_model";

const Others_index = () => {

    const [
        isOpenModalCreateMark, 
        setIsOpenModalCreateMark,
        isOpenModalCreateModel,
        setIsOpenModalCreateModel,
        isOpenModalCreateCategorie,
        setIsOpenModalCreateCategorie 
    ] = useModal();

    //Edit Data//
    const [editDataCategorie, setEditDataCategorie] = useState(null);
    const [editDataMark, setEditDataMark] = useState(null);
    const [editDataModel, setEditDataModel] = useState(null);

    return (
        <Layout_base>
            <Form_Categorie 
                setIsOpenModalCreateCategorie={setIsOpenModalCreateCategorie} 
                isOpenModalCreateCategorie={isOpenModalCreateCategorie} 
                editDataCategorie={editDataCategorie} 
                setEditDataCategorie={setEditDataCategorie}/>

            <Form_Mark 
                isOpenModalCreateMark={isOpenModalCreateMark} 
                setIsOpenModalCreateMark={setIsOpenModalCreateMark} 
                editDataMark={editDataMark} 
                setEditDataMark={setEditDataMark}/>

            <Form_Model 
                isOpenModalCreateModel={isOpenModalCreateModel} 
                editDataModel={editDataModel} 
                setEditDataModel={setEditDataModel} 
                setIsOpenModalCreateModel={setIsOpenModalCreateModel}/>
    
            <div className='lg:relative overflow-x-auto lg:w-4/5 lg:ml-60 lg:mr-8 w-full ml-8 mr-4 mt-6 justify-center items-center flex pb-4'>
                <Table_others 
                    setEditDataCategorie={setEditDataCategorie} 
                    setIsOpenModalCreateCategorie={setIsOpenModalCreateCategorie}
                    setIsOpenModalCreateMark={setIsOpenModalCreateMark} 
                    setEditDataMark={setEditDataMark} 
                    setIsOpenModalCreateModel={setIsOpenModalCreateModel} 
                    setEditDataModel={setEditDataModel} 
                />  
            </div>      
        </Layout_base>   
    );
};

export default Others_index;

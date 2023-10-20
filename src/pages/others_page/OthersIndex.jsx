import { useEffect, useState } from "react";
import LayoutBase from "../../layout/LayoutBase"
import TableOthers from "./TableOthers";
import { useModal } from "../../hooks/useModal";
import { FormCategorie } from "./formOthersCategorie";
import { FormMark } from "./formOthersMark";
import { FormModel } from "./formOthersModel";
import { useFetch } from "../../hooks/useFetch";
import { endPoints } from "../../services/endPoints/endPoints";

const OthersIndex = () => {

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

    //--- Load Data Categorie---//
    const urlCategorie = endPoints.categories.getCategories;
    const {data:dataCategories, loading:loadingCategory, error: errorCategorie, loadingData: loadCategoriesProducts} = useFetch(urlCategorie);

    //--- Load Data Mark---//
    const urlMark = endPoints.marks.getMarks;
    const {data:dataMark, loadingData: loadMarkProducts, loading:loadingMark, error:errorMark} = useFetch(urlMark);

    //--- Load Data Model---//
    const urlModel = endPoints.models.getModels;
    const {data:dataModel, loadingData: loadModelProducts, loading:loadingModel, error:errorModel} = useFetch(urlModel);

    useEffect(() => {
        loadCategoriesProducts();
        loadMarkProducts();
        loadModelProducts();
    },[urlCategorie, urlMark, urlModel]);

    return (
        <LayoutBase>
            <FormCategorie 
                setIsOpenModalCreateCategorie={setIsOpenModalCreateCategorie} 
                isOpenModalCreateCategorie={isOpenModalCreateCategorie} 
                loadCategoriesProducts={loadCategoriesProducts}
                editDataCategorie={editDataCategorie} 
                setEditDataCategorie={setEditDataCategorie}/>

            <FormMark 
                isOpenModalCreateMark={isOpenModalCreateMark} 
                setIsOpenModalCreateMark={setIsOpenModalCreateMark} 
                editDataMark={editDataMark} 
                loadMarkProducts={loadMarkProducts}
                setEditDataMark={setEditDataMark}/>

            <FormModel 
                isOpenModalCreateModel={isOpenModalCreateModel} 
                editDataModel={editDataModel} 
                loadModelProducts={loadModelProducts}
                dataMark={dataMark}
                setEditDataModel={setEditDataModel} 
                setIsOpenModalCreateModel={setIsOpenModalCreateModel}/>
    
            <div className='lg:relative overflow-x-auto lg:w-4/5 lg:ml-60 lg:mr-8 w-full ml-8 mr-4 mt-6 justify-center items-center flex pb-4'>
                <TableOthers 
                    setEditDataCategorie={setEditDataCategorie} 
                    dataCategories={dataCategories}
                    dataMark={dataMark}
                    loadingCategory={loadingCategory}
                    errorCategorie={errorCategorie}
                    dataModel={dataModel}
                    loadingMark={loadingMark} 
                    errorMark={errorMark}
                    loadingModel={loadingModel} 
                    errorModel={errorModel}
                    loadCategoriesProducts={loadCategoriesProducts}
                    loadMarkProducts={loadMarkProducts}
                    loadModelProducts={loadModelProducts}
                    setIsOpenModalCreateCategorie={setIsOpenModalCreateCategorie}
                    setIsOpenModalCreateMark={setIsOpenModalCreateMark} 
                    setEditDataMark={setEditDataMark} 
                    setIsOpenModalCreateModel={setIsOpenModalCreateModel} 
                    setEditDataModel={setEditDataModel} 
                />  
            </div>      
        </LayoutBase>   
    );
};

export default OthersIndex;

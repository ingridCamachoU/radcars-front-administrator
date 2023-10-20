import { useFetch } from "../hooks/useFetch";
import { endPoints } from "./endPoints/endPoints";

export const GetProduct = () => {
    //--- Load Data Product---//
    const urlProduct = endPoints.products.getProducts;
    const {data:dataProducts, loading: loadingProduct, loadingData: loadDataProducts} = useFetch(urlProduct);
    
    return {dataProducts, loadingProduct, loadDataProducts, urlProduct};
};

export const GetProvider = () => {
    const urlProvider = endPoints.providers.getProviders;
    const {data:dataProvider, loading: loadingProvider, loadingData: loadDataProvider} = useFetch(urlProvider);
    
    return (dataProvider, loadingProvider, loadDataProvider, urlProvider);
};

export const GetModel = () => {
    const urlModel = endPoints.models.getModels;
    const {data:dataModel, loading: loadingModel, loadingData: loadDataModel} = useFetch(urlModel);
    
    return (dataModel, loadingModel, loadDataModel, urlModel);
};

export const GetMark = () => {
    const urlMark = endPoints.marks.getMarks;
    const {data:dataMark, loading: loadingMark, loadingData: loadDataMark} = useFetch(urlMark);
    
    return (dataMark, loadingMark, loadDataMark, urlMark);
};

export const GetCategorie = () => {
    const urlCategorie = endPoints.categories.getCategories;
    const {data:dataCategorie, loading: loadingCategorie, loadingData: loadDataCategorie} = useFetch(urlCategorie);
    
    return (dataCategorie, loadingCategorie, loadDataCategorie, urlCategorie);
};





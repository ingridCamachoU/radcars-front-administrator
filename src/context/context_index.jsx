import { createContext, useContext, useEffect, useState } from "react";
import { alertError, alertWarning } from "../utils/alerts";

const UserContext = createContext();

export const UserContextProvider = ({children}) => {
    
    //--- Data ---//
    const [dataProducts, setDataProducts] = useState([]);
    const [dataModels, setDataModels] = useState([]);
    const [dataCategories, setDataCategories] = useState([]);
    const [dataProviders, setDataProviders] = useState([]);
    const [dataMark, setDataMark] = useState([]);

    //--- URLS ---//

    const urlProducts = `${import.meta.env.VITE_BACKEND_URL}api/v1/products/`;
    const urlModels = `${import.meta.env.VITE_BACKEND_URL}api/v1/models/`;
    const urlCategories = `${import.meta.env.VITE_BACKEND_URL}api/v1/categories/`;
    const urlProviders = `${import.meta.env.VITE_BACKEND_URL}api/v1/providers/`;
    const urlMarks = `${import.meta.env.VITE_BACKEND_URL}api/v1/marks/`;

    //--- Load Data Products---//
    const load_data_products = () => {
        fetch(urlProducts)
        .then(response => response.json())
        .then(data => setDataProducts(data))
        .catch((error) => {
            console.log(error);
            if (error.code === 'ERR_BAD_REQUEST'){
                alertError('Error 404, Página no encontrada!');
            }
            if (error.code === 'ERR_NETWORK'){
                alertWarning('Algo salió mal, pero no te preocupes, no es tu culpa. Vamos a intentarlo de nuevo.!');
            }             
        })
    };

     //--- Load Models Products---//
    const load_Models_products = () => {
        fetch(urlModels)
        .then(response => response.json())
        .then(data => setDataModels(data))
        .catch((error) => {
            console.log(error);
            if (error.code === 'ERR_BAD_REQUEST'){
                alertError('Error 404, Página no encontrada!');
            }
            if (error.code === 'ERR_NETWORK'){
                alertWarning('Algo salió mal, pero no te preocupes, no es tu culpa. Vamos a intentarlo de nuevo.!');
            }     
        })
    };

    //--- Load Categories Products---//
    const load_Categories_products = () => {
        fetch(urlCategories)
        .then(response => response.json())
        .then(data => setDataCategories(data))
        .catch((error) => {
            console.log(error);
            if (error.code === 'ERR_BAD_REQUEST'){
                alertError('Error 404, Página no encontrada!');
            }
            if (error.code === 'ERR_NETWORK'){
                alertWarning('Algo salió mal, pero no te preocupes, no es tu culpa. Vamos a intentarlo de nuevo.!');
            }           
        })
    };

    //--- Load Data Products---//
    const load_data_providers = () => {
        fetch(urlProviders)
        .then(response => response.json())
        .then(data => setDataProviders(data))
        .catch((error) => {
            console.log(error);
            if (error.code === 'ERR_BAD_REQUEST'){
                alertError('Error 404, Página no encontrada!');
            }
            if (error.code === 'ERR_NETWORK'){
                alertWarning('Algo salió mal, pero no te preocupes, no es tu culpa. Vamos a intentarlo de nuevo.!');
            }             
        })
    };

    //--- Load Data Marks---//
    const load_data_marks = () => {
        fetch(urlMarks)
        .then(response => response.json())
        .then(data => setDataMark(data))
        .catch((error) => {
            console.log(error);
            if (error.code === 'ERR_BAD_REQUEST'){
                alertError('Error 404, Página no encontrada!');
            }
            if (error.code === 'ERR_NETWORK'){
                alertWarning('Algo salió mal, pero no te preocupes, no es tu culpa. Vamos a intentarlo de nuevo.!');
            }             
        })
    };

    useEffect(() => {
        load_data_products();
        load_Models_products();
        load_Categories_products();
        load_data_providers();
        load_data_marks();
    }, []);

    return (
        <UserContext.Provider value={{dataProducts, urlProducts, load_data_products, dataModels, load_Models_products, dataCategories, load_data_providers, dataProviders, urlProviders, dataMark, urlCategories, load_Categories_products, urlMarks, load_data_marks, urlModels}}>
            {children}
        </UserContext.Provider>
    );
}

export const useUSerContext = () => useContext(UserContext);

import { createContext, useContext, useEffect, useState } from "react";
import Swal from 'sweetalert2';

const UserContext = createContext();

export const UserContextProvider = ({children}) => {

    const [dataProducts, setDataProducts] = useState([]);
    const [dataModels, setDataModels] = useState([]);
    const [dataCategories, setDataCategories] = useState([]);

    const urlProducts = `${import.meta.env.VITE_BACKEND_URL}api/v1/products/`;
    const urlModels = `${import.meta.env.VITE_BACKEND_URL}api/v1/models/`;
    const urlCategories = `${import.meta.env.VITE_BACKEND_URL}api/v1/categories/`;

    //---Alert Not Found Error 404---//
    const error_not_found = () => (
        Swal.fire({
            icon: 'error',
            title: 'Error 404',
            text: 'Página no encontrada!',
        })
    );

     //---Alert Error Network---//
    const error_err_network = () => (
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo salió mal, pero no te preocupes, no es tu culpa. Vamos a intentarlo de nuevo.!',
        })
    );
       
    //--- Load Data Products---//
    const load_data_products = () => {
        fetch(urlProducts)
        .then(response => response.json())
        .then(data => setDataProducts(data))
        .catch((error) => {
            console.log(error);
            if (error.code === 'ERR_BAD_REQUEST'){
                error_not_found();
            }
            if (error.code === 'ERR_NETWORK'){
                error_err_network();
            }           
        })
    }

     //--- Load Models Products---//
    const load_Models_products = () => {
        fetch(urlModels)
        .then(response => response.json())
        .then(data => setDataModels(data))
        .catch((error) => {
            console.log(error);
            if (error.code === 'ERR_BAD_REQUEST'){
                error_not_found();
            }
            if (error.code === 'ERR_NETWORK'){
                error_err_network();
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
                error_not_found();
            }
            if (error.code === 'ERR_NETWORK'){
                error_err_network();
            }         
        })
    };

    useEffect(() => {
        load_data_products();
        load_Models_products();
        load_Categories_products();
    }, []);

    return (
        <UserContext.Provider value={{dataProducts, urlProducts, load_data_products, dataModels, load_Models_products, dataCategories}}>
            {children}
        </UserContext.Provider>
    );
}

export const useUSerContext = () => useContext(UserContext);

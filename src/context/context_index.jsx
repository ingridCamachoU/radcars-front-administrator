import { createContext, useContext, useEffect, useState } from "react";
import { endPoints } from "../services/endPoints/endPoints";
import Error from "../utils/error";

const UserContext = createContext();

// eslint-disable-next-line react/prop-types
export const UserContextProvider = ({children}) => {
    
    //--- Data ---//
    const [dataProducts, setDataProducts] = useState([]);
    const [dataModels, setDataModels] = useState([]);
    const [dataCategories, setDataCategories] = useState([]);
    const [dataProviders, setDataProviders] = useState([]);
    const [dataMark, setDataMark] = useState([]);

    // Get products by title //
    const [searchByTitle, setSearchByTitle ] = useState('');

    //--- Load Data Products---//
    const load_data_products = () => {
        fetch(endPoints.products.getSearchProducts(searchByTitle))
            .then(response => response.json())
            .then(data => setDataProducts(data))
            .catch((error) => {
                console.log(error);
                Error(error);       
            })
    };

    //--- Load Models Products---//
    const load_Models_products = () => {
        fetch(endPoints.models.getModels)
            .then(response => response.json())
            .then(data => setDataModels(data))
            .catch((error) => {
                console.log(error);
                Error(error);    
            })
    };

    //--- Load Categories Products---//
    const load_Categories_products = () => {
        fetch(endPoints.categories.getCategories)
            .then(response => response.json())
            .then(data => setDataCategories(data))
            .catch((error) => {
                console.log(error);
                Error(error);          
            })
    };

    //--- Load Data Products---//
    const load_data_providers = () => {
        fetch(endPoints.providers.getProviders)
            .then(response => response.json())
            .then(data => setDataProviders(data))
            .catch((error) => {
                console.log(error);
                Error(error);          
            })
    };

    //--- Load Data Marks---//
    const load_data_marks = () => {
        fetch(endPoints.marks.getMarks)
            .then(response => response.json())
            .then(data => setDataMark(data))
            .catch((error) => {
                console.log(error);
                Error(error);           
            })
    };

    const urlSearch= endPoints.products.getSearchProducts(searchByTitle);

    useEffect(() => {
        load_data_products();
        load_Models_products();
        load_Categories_products();
        load_data_providers();
        load_data_marks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [urlSearch]);

    return (
        <UserContext.Provider value={{
            dataProducts, 
            load_data_products, 
            dataModels, 
            load_Models_products, 
            dataCategories, 
            load_data_providers, 
            dataProviders, 
            dataMark, 
            load_Categories_products, 
            load_data_marks, 
            setSearchByTitle, 
            searchByTitle
        }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUSerContext = () => useContext(UserContext);

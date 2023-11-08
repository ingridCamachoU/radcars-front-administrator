import { useContext, useEffect, useState } from 'react';
import LayoutBase from '../../layout/LayoutBase';
import FormAddProduct from './FormAddProduct';
import TableDataProducts from './TableDataProducts';
import { useModal } from '../../hooks/useModal';
import FormAddQuotation from './FormAddQuotation';
import DetailsProducts from './DetailsProducts';
import { endPoints } from '../../services/endPoints/endPoints';
import { errors } from '../../utils/alerts';
import HeaderPages from '../../components/headerPages/HeaderPages';
import { useFetch } from '../../hooks/useFetch';
import { DarkMode } from '../../context/DarkMode';

const ProductsIndex = () => {

    const [
        isOpenModalAddProduct, 
        setIsOpenModalAddProduct, 
        isOpenModalCreateQuotation,  
        setIsOpenModalCreateQuotation,  
        isOpenModalDetailProduct, 
        setIsOpenModalDetailProduct
    ] = useModal();

    const {searchByTitle} = useContext(DarkMode);
    
    const [editDataProduct, setEditDataProduct] = useState(null);
    const [title, setTitle]= useState('');
    
    const [datasQuotation, setDatasQuotation] = useState([]);

    //--- Load Data Quotation---//
    const loadDataQuotation = (id) => {
        const urlQuotation = endPoints.quotations.getQuotations(id);
        fetch(urlQuotation)
            .then(response => response.json())
            .then(data => setDatasQuotation(data))
            .catch((error) => {
                errors(error);            
            })
    };
    
    //--- Load Data Product---//
    const urlProduct = endPoints.products.getSearchProducts(searchByTitle);
    const {data:dataProducts, loading, error, loadingData: loadDataProducts} = useFetch(urlProduct);

    //--- Load Data Provider---//
    const urlProvider = endPoints.providers.getProviders;
    const {data:dataProvider, loadingData: loadDataProvider} = useFetch(urlProvider);

    //--- Load Data Categorie---//
    const urlCategorie = endPoints.categories.getCategories;
    const {data:dataCategories, loadingData: loadDataCategorie} = useFetch(urlCategorie);

    //--- Load Data Model---//
    const urlModel = endPoints.models.getModels;
    const {data:dataModel, loadingData: loadDataModel} = useFetch(urlModel);

    useEffect(() => {
        loadDataCategorie();
        loadDataModel();
        loadDataProducts();
        loadDataProvider();
    },[urlProduct,urlProvider, urlCategorie, urlModel]);

    const add = () => {
        setTitle('Crear Producto');
        setIsOpenModalAddProduct(true);
    }

    return (
        <LayoutBase>
            <div 
                className='lg:w-4/5 w-full lg:ml-60 max-w-screen-xl flex justify-center h-full pr-4 mt-6 ml-10'>
                <HeaderPages 
                    title={'Productos'} 
                    onClick={add}/>
            </div>
                                          
            <FormAddProduct 
                isOpenModalAddProduct={isOpenModalAddProduct} 
                setIsOpenModalAddProduct={setIsOpenModalAddProduct}
                editDataProduct={editDataProduct}
                title={title}
                dataModel={dataModel} 
                dataCategorie={dataCategories}
                loadDataProducts={loadDataProducts}
                setEditDataProduct={setEditDataProduct}
                setIsOpenModalCreateQuotation={setIsOpenModalCreateQuotation}
                datasQuotation={datasQuotation}/>

            <FormAddQuotation 
                dataProvider={dataProvider}
                isOpenModalCreateQuotation={isOpenModalCreateQuotation}
                setIsOpenModalCreateQuotation={setIsOpenModalCreateQuotation} 
                loadDataQuotation={loadDataQuotation} 
                editDataProduct={editDataProduct}/>

            <DetailsProducts 
                isOpenModalDetailProduct={isOpenModalDetailProduct}
                setIsOpenModalDetailProduct={setIsOpenModalDetailProduct}
                editDataProduct={editDataProduct}
                datasQuotation={datasQuotation}/>

            <div className='lg:relative lg:w-4/5 lg:ml-60 lg:mr-8 w-full ml-8 mr-4 mt-6 rounded-lg justify-center items-center flex pb-4 overflow-x-auto'>
                <TableDataProducts 
                    dataProducts= {dataProducts}
                    loadDataProducts={loadDataProducts}
                    setIsOpenModalDetailProduct={setIsOpenModalDetailProduct}
                    setEditDataProduct={setEditDataProduct} 
                    loadDataQuotation={loadDataQuotation} 
                    setIsOpenModalAddProduct={setIsOpenModalAddProduct}
                    loading={loading}
                    error={error}
                    setTitle={setTitle}/>
            </div>
              
        </LayoutBase>
    )
};

export default ProductsIndex;



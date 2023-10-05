import { useState } from 'react';
import Header_pages from '../../components/header_pages/Header_pages';
import Layout_base from '../../layout/Layout_base';
import Form_add_product from './Form_add_product';
import Table_data_products from './Table_data_products';
import { useModal } from '../../hooks/useModal';
import Form_add_quotation from './Form_add_quotation';
import Details_products from './Details_products';
import { endPoints } from '../../services/endPoints/endPoints';
import Error from '../../utils/error';

const Products_index = () => {

    const [
        isOpenModalAddProduct, 
        setIsOpenModalAddProduct, 
        isOpenModalCreateQuotation,  
        setIsOpenModalCreateQuotation,  
        isOpenModalDetailProduct, 
        setIsOpenModalDetailProduct
    ] = useModal();

    const [editDataProduct, setEditDataProduct] = useState(null);
    const [datasQuotation, setDatasQuotation] = useState([]);
    const [title, setTitle]= useState('');

    //--- Load Data Quotation---//
    const load_data_quotation = (id) => {
        fetch(endPoints.quotations.getQuotations(id))
            .then(response => response.json())
            .then(data => setDatasQuotation(data))
            .catch((error) => {
                Error(error);            
            })
    };

    const add = () => {
        setTitle('Crear Producto');
        setIsOpenModalAddProduct(true);
    }
  
    return (
        <Layout_base>
            <div 
                className='lg:w-4/5 w-full lg:ml-60 max-w-screen-xl flex justify-center h-full pr-4 mt-6 ml-10'>
                <Header_pages 
                    title={'Productos'} 
                    onClick={add}/>
            </div>
                                          
            <Form_add_product 
                isOpenModalAddProduct={isOpenModalAddProduct} 
                setIsOpenModalAddProduct={setIsOpenModalAddProduct}
                editDataProduct={editDataProduct}
                title={title}
                setEditDataProduct={setEditDataProduct}
                setIsOpenModalCreateQuotation={setIsOpenModalCreateQuotation}
                datasQuotation={datasQuotation}/>

            <Form_add_quotation 
                isOpenModalCreateQuotation={isOpenModalCreateQuotation}
                setIsOpenModalCreateQuotation={setIsOpenModalCreateQuotation} 
                load_data_quotation={load_data_quotation} 
                editDataProduct={editDataProduct}/>

            <Details_products 
                isOpenModalDetailProduct={isOpenModalDetailProduct}
                setIsOpenModalDetailProduct={setIsOpenModalDetailProduct}
                editDataProduct={editDataProduct}
                datasQuotation={datasQuotation}/>

            <div className='lg:relative lg:w-4/5 lg:ml-60 lg:mr-8 w-full ml-8 mr-4 mt-6 rounded-lg justify-center items-center flex pb-4 overflow-x-auto'>
                <Table_data_products 
                    setIsOpenModalDetailProduct={setIsOpenModalDetailProduct}
                    setEditDataProduct={setEditDataProduct} 
                    load_data_quotation={load_data_quotation} 
                    setIsOpenModalAddProduct={setIsOpenModalAddProduct}
                    setTitle={setTitle}/>
            </div>
              
        </Layout_base>
    )
};

export default Products_index;



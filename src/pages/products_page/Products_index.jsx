import Header_pages from '../../components/header_pages/Header_pages';
import Layout_base from '../../layout/Layout_base';
import Form_add_product from './Form_add_product';
import Form_edit_product from './Form_edit_product';
import Table_data_products from './Table_data_products';
import { useModal } from '../../hooks/useModal';
import { useUSerContext } from '../../context/context_index';
import { alertWarning, alertError, alertAdd } from '../../utils/alerts';
import { useState } from 'react';
import Form_add_quotation from './Form_add_quotation';

const Products_index = () => {

   const [isOpenModalAddProduct, setIsOpenModalAddProduct, openModalAddProduct, closeModalAddProduct, isOpenModalEditProduct, setIsOpenModalEditProduct, openModalEditProduct, closeModalEditProduct, isOpenModalCreateQuotation, openModalCreateQuotation, closeModalCreateQuotation, setIsOpenModalCreateQuotation ] = useModal() ;

   const {urlProducts, load_data_products} = useUSerContext();
   const [editDataProduct, setEditDataProduct] = useState(null);
   const [datasQuotation, setDatasQuotation] = useState([]);

   //---Delete Products---//
    const deleteProduct = (id) => {

        let requestOptions = {
            method: 'DELETE',
        };
          
        fetch(`${urlProducts}${id}/`, requestOptions)
        .then(response => {
            if(response.status === 409){
                return response.json();
            }else{
                return response.text();
            }
        })
        .then((response) => {
            if(response?.message){
                alertWarning('No eliminado!');
            }else{
                alertAdd('El producto ha sido eliminado.');
                load_data_products(); 
            }
        })
        .catch((error) => {
            console.log('error:',error);
            alertError('No eliminado, el producto tiene cotizaciones');
            load_data_products(); 
        })    
    };

    //--- Load Data Quotation---//
    const load_data_quotation = (id) => {
        fetch(`${urlProducts}${id?.id}/quotations/`)
        .then(response => response.json())
        .then(data => setDatasQuotation(data))
        .catch((error) => {
            if (error.code === 'ERR_BAD_REQUEST'){
                alertError('Error 404, Página no encontrada!');
            }
            if (error.code === 'ERR_NETWORK'){
                alertWarning('Algo salió mal, pero no te preocupes, no es tu culpa. Vamos a intentarlo de nuevo.!');
            }             
        })
    };

    //---Create New Quotation---//
    const addQuotation = (formData) => {
        let data = JSON.stringify(formData);
        fetch(`${urlProducts}${formData.product}/quotations/`, {
            method: "post",
            maxBodyLength: Infinity,
            body: data,
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then(response => response.json())
        .then(response => {  
            alertAdd('Cotización Agregada');
            load_data_quotation();  
        })
        .catch((error) => {
            console.log(error);
            let erorCodigo= (error.response.data.code);
            alertError(erorCodigo)
            load_data_quotation(); 
        })
        load_data_quotation(); 
        closeModalCreateQuotation();
    };

    //---Delete Quotation---//
    const deleteQuotation = (id) => {

        let requestOptions = {
            method: 'DELETE',
        };
          
        fetch(`${urlProducts}${editDataProduct.id}/quotations/${id}/`, requestOptions)
        .then(response => {
            if(response.status === 409){
                return response.json();
            }else{
                return response.text();
            }
        })
        .then((response) => {
            if(response?.message){
                alertWarning('No eliminado!');
            }else{
                alertAdd('La Cotización ha sido eliminado.');
                load_data_quotation(); 
                closeModalEditProduct();
            }
        })
        .catch((error) => {
            console.log('error:',error);
            alertError(error);
            load_data_quotation();  
        })  
        load_data_quotation();  
    };
    
    return (
        <Layout_base>
            <div className='lg:w-4/5 w-full lg:ml-60 max-w-screen-xl flex justify-center h-full pr-4 mt-6 ml-10'>
                <Header_pages title={'Productos'} onClick={openModalAddProduct}/>
            </div>
                                          
            <Form_add_product isOpenModalAddProduct={isOpenModalAddProduct} closeModalAddProduct={closeModalAddProduct}setIsOpenModalAddProduct={setIsOpenModalAddProduct}/>

            <Form_edit_product isOpenModalEditProduct={isOpenModalEditProduct} closeModalEditProduct={closeModalEditProduct}setIsOpenModalEditProduct={setIsOpenModalEditProduct} editDataProduct={editDataProduct} openModalCreateQuotation={openModalCreateQuotation} datasQuotation={datasQuotation} deleteQuotation={deleteQuotation}/>

            <Form_add_quotation isOpenModalCreateQuotation={isOpenModalCreateQuotation}closeModalCreateQuotation={closeModalCreateQuotation} load_data_quotation={load_data_quotation} editDataProduct={editDataProduct} addQuotation={addQuotation}/>

            <div className='lg:relative lg:w-4/5 lg:ml-60 lg:mr-8 w-full ml-8 mr-4 mt-6 rounded-lg justify-center items-center flex pb-4'>
                <Table_data_products deleteProduct={deleteProduct} openModalEditProduct={openModalEditProduct} setEditDataProduct={setEditDataProduct} editDataProduct={editDataProduct} load_data_quotation={load_data_quotation} addQuotation={addQuotation}/>
            </div>
              
        </Layout_base>
    )
};

export default Products_index;



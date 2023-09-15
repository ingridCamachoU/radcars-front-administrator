import Header_pages from '../../components/header_pages/Header_pages';
import Layout_base from '../../layout/Layout_base';
import Form_add_product from './Form_add_product';
import Table_data_products from './Table_data_products';
import { useModal } from '../../hooks/useModal';
import { useUSerContext } from '../../context/context_index';
import Swal from 'sweetalert2';
import { useState } from 'react';

const Products_index = () => {

   const [isOpenModalAddProduct, setIsOpenModalAddProduct, openModal, closeModal] = useModal() ;

   const {urlProducts, load_data_products} = useUSerContext();

   const [editDataProduct, setEditDataProduct] = useState(null);

    //---Alert Error---//
    const alertError = (erorCodigo) =>{
        Swal.fire({
            text: erorCodigo,
            icon: 'error',
            confirmButtonText: 'Ok'
        });
    };

    //---Edit Products---//
    const editPRoduct = (formData) => {
        let data = JSON.stringify(formData);
        fetch(`${urlProducts}${editDataProduct.id}/`, {
            method: "put",
            maxBodyLength: Infinity,
            body: data,
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then(response => {
            response.json();
            console.log( response.json())
            alerAdd('Producto Editado');
            load_data_products();  
            setEditDataProduct(null); 
        })
        .catch((error) => {
            console.log(error);
            let erorCodigo= (error.response.data.code);
            alertError(erorCodigo)
            load_data_products(); 
        })
        
    };

   //---Delete Products---//
    const deleteProduct = (id) => {

        let requestOptions = {
            method: 'DELETE',
            redirect: 'follow'
          };
          
          fetch(`${urlProducts}${id}/`, requestOptions)

            .then(result => {
                Swal.fire(
                    'Eliminado!',
                    'El producto ha sido eliminado.',
                    'success'
                )
                load_data_products(); 
            })
            .catch((error) => {
                console.log(error.response);
                let erorCodigo= (error.response);
                alertError(erorCodigo)
                load_data_products(); 
            })

            
    };


    return (
        <Layout_base>
            <div className='lg:w-4/5 w-full lg:ml-60 max-w-screen-xl flex justify-center h-full pr-4 mt-6 ml-10'>
                <Header_pages title={'Productos'} onClick={openModal}/>
            </div>

            { /* Modal add Product */ } 
                                          
            <Form_add_product isOpenModalAddProduct={isOpenModalAddProduct} setIsOpenModalAddProduct={setIsOpenModalAddProduct} closeModal={closeModal}/>

            <div className='lg:relative overflow-x-auto lg:w-4/5 lg:ml-60 lg:mr-8 w-full ml-8 mr-4 mt-6 rounded-lg'>
                <Table_data_products deleteProduct={deleteProduct}/>
            </div>
              
        </Layout_base>
    )
};

export default Products_index;

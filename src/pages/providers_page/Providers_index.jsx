import { useState } from "react";
import Header_pages from "../../components/header_pages/Header_pages";
import Layout_base from "../../layout/Layout_base";
import Table_data_providers from "./Table_data_providers";
import Form_providers from "./Form_providers";
import { useUSerContext } from "../../context/context_index";
import { alertWarning, alertError, alertAdd } from '../../utils/alerts';

const Providers_index = () => {

    const [editDataProv, setEditDataProv] = useState(null);

    const {urlProviders, load_data_providers} = useUSerContext();

    //Modal Provider//
    const [isOpenModalAddProv, setIsOpenModalAddProv] = useState(false);

    const openModalAddProv = () => setIsOpenModalAddProv(true);
    const closeModalAddProv = () => setIsOpenModalAddProv(false);
    const [title, setTitle]= useState('');

    //---Delete Provider---//
    const deleteProvider = (id) => {

        let requestOptions = {
            method: 'DELETE',
        };
          
        fetch(`${urlProviders}${id}/`, requestOptions)
    
        .then((response) => {
            if(response.status=== 500){
                alertWarning('No eliminado, el proveedor ha sido asignado a un producto!');
            }else{
                alertAdd('El proveedor ha sido eliminado.');
                load_data_providers(); 
            }
        })
        .catch((error) => {
            console.log('error:',error);
            alertError('El proveedor ha sido asignado a un producto');
            load_data_providers(); 
        })     
    };

    const open=()=>{
        openModalAddProv();
        setTitle('Registrar Proveedor');
    };

    return (
        <Layout_base>
            <div className='lg:w-4/5  lg:ml-60 max-w-screen-xl flex justify-center h-full pr-4 mt-6 ml-10 w-full'>
                <Header_pages title={'Proveedores'} onClick={open}/>
            </div>

            <Form_providers isOpenModalAddProv={isOpenModalAddProv} closeModalAddProv={closeModalAddProv} editDataProv={editDataProv} setEditDataProv={setEditDataProv} setIsOpenModalAddProv={setIsOpenModalAddProv} title={title}/>

            <div className='lg:relative overflow-x-auto lg:w-4/5 lg:ml-60 lg:mr-8 w-full ml-8 mr-4 mt-6 rounded-lg justify-center items-center flex pb-4'>
                <Table_data_providers openModalAddProv={openModalAddProv} setEditDataProv={setEditDataProv} deleteProvider={deleteProvider} setIsOpenModalAddProv={setIsOpenModalAddProv} isOpenModalAddProv={isOpenModalAddProv} setTitle={setTitle}/>
            </div>
              
        </Layout_base>
    );
};

export default Providers_index;

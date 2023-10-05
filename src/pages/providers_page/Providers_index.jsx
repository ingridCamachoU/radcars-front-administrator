import { useState } from "react";
import Header_pages from "../../components/header_pages/Header_pages";
import Layout_base from "../../layout/Layout_base";
import Table_data_providers from "./Table_data_providers";
import Form_providers from "./Form_providers";
import { useModal } from "../../hooks/useModal";

const Providers_index = () => {

    const [ editDataProv, setEditDataProv ] = useState(null);

    const [ isOpenModalAddProv, setIsOpenModalAddProv ] = useModal();

    const [title, setTitle]= useState('');

    const open=()=>{
        setIsOpenModalAddProv(true);
        setTitle('Registrar Proveedor');
    };

    return (
        <Layout_base>
            <div className='lg:w-4/5  lg:ml-60 max-w-screen-xl flex justify-center h-full pr-4 mt-6 ml-10 w-full'>
                <Header_pages 
                    title={'Proveedores'} 
                    onClick={open}/>
            </div>

            <Form_providers 
                isOpenModalAddProv={isOpenModalAddProv} 
                editDataProv={editDataProv} 
                setEditDataProv={setEditDataProv} 
                setIsOpenModalAddProv={setIsOpenModalAddProv} 
                title={title}/>

            <div className='lg:relative overflow-x-auto lg:w-4/5 lg:ml-60 lg:mr-8 w-full ml-8 mr-4 mt-6 rounded-lg justify-center items-center flex pb-4'>
                <Table_data_providers 
                    setIsOpenModalAddProv={setIsOpenModalAddProv} 
                    setEditDataProv={setEditDataProv} 
                    isOpenModalAddProv={isOpenModalAddProv} 
                    setTitle={setTitle}/>
            </div>            
        </Layout_base>
    );
};

export default Providers_index;

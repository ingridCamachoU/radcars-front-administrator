import { useEffect, useState } from "react";
import LayoutBase from "../../layout/LayoutBase";
import TableDataProviders from "./TableDataProviders";
import FormProviders from "./FormProviders";
import { useModal } from "../../hooks/useModal";
import HeaderPages from "../../components/headerPages/HeaderPages";
import { useFetch } from "../../hooks/useFetch";
import { endPoints } from "../../services/endPoints/endPoints";

const ProvidersIndex = () => {

    const [ editDataProv, setEditDataProv ] = useState(null);

    const [ isOpenModalAddProv, setIsOpenModalAddProv ] = useModal();

    const [title, setTitle]= useState('');

    const open=()=>{
        setIsOpenModalAddProv(true);
        setTitle('Registrar Proveedor');
    };

    //--- Load Data Provider---//
    const urlProvider = endPoints.providers.getProviders;
    const {data:dataProvider, loadingData: loadDataProvider, loading, error} = useFetch(urlProvider);

    useEffect(() => {
        loadDataProvider();
    },[urlProvider]);

    return (
        <LayoutBase>
            <div className='lg:w-4/5  lg:ml-60 max-w-screen-xl flex justify-center h-full pr-4 mt-6 ml-10 w-full'>
                <HeaderPages 
                    title={'Proveedores'} 
                    onClick={open}/>
            </div>

            <FormProviders 
                isOpenModalAddProv={isOpenModalAddProv} 
                editDataProv={editDataProv} 
                setEditDataProv={setEditDataProv} 
                loadDataProvider={loadDataProvider}
                setIsOpenModalAddProv={setIsOpenModalAddProv} 
                title={title}/>

            <div className='lg:relative overflow-x-auto lg:w-4/5 lg:ml-60 lg:mr-8 w-full ml-8 mr-4 mt-6 rounded-lg justify-center items-center flex pb-4'>
                <TableDataProviders 
                    dataProvider={dataProvider}
                    loadDataProvider={loadDataProvider}
                    setIsOpenModalAddProv={setIsOpenModalAddProv} 
                    setEditDataProv={setEditDataProv} 
                    isOpenModalAddProv={isOpenModalAddProv} 
                    setTitle={setTitle}
                    loading={loading}
                    error={error}/>
            </div>            
        </LayoutBase>
    );
};

export default ProvidersIndex;

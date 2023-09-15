import { useEffect, useState } from "react";
import Header_pages from "../../components/header_pages/Header_pages";
import Layout_base from "../../layout/Layout_base";
import Table_data_providers from "./Table_data_providers";

const Providers_index = () => {

    const [providers, setProviders] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/api/v1/providers/')
        .then( response => response.json())
        .then( data => setProviders(data))
    }, []);

    return (
        <Layout_base>
            <div className='lg:w-4/5 w-full lg:ml-60 max-w-screen-xl flex justify-center h-full pr-4 mt-6 ml-10'>
                <Header_pages title={'Proveedores'}/>
            </div>

            <div className='lg:relative overflow-x-auto lg:w-4/5 lg:ml-60 lg:mr-8 w-full ml-8 mr-4 mt-6 rounded-lg'>
                <Table_data_providers providers={providers}/>
            </div>
              
        </Layout_base>
    );
};

export default Providers_index;

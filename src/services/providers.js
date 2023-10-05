import axios from 'axios';
import { endPoints } from './endPoints/endPoints';
import { alert } from '../utils/alerts2';

// Add Provider //
const addProvider = async(body, load_data_providers) => {
    const data = JSON.stringify(body);

    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: endPoints.providers.getProviders,
        headers: {
            'Content-Type': 'application/json',
        },
        data: data,
    };
    
    try {
        const response = await axios(config);
        alert('Proveedor Agregado','success');
        load_data_providers();
        return response.data;
        
    } catch (error) {
        const erorCodigo= (error.response.data.code);
        alert(erorCodigo,'error');
    }
};

// Update Provider //
const updateProvider = async(id, body, setEditDataProv, load_data_providers) => {
    const data = JSON.stringify(body);
    const config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: endPoints.providers.updateProviders(id),
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
    };
    try {
        const response = await axios(config);
        alert('Proveedor Editado con Éxito','success');
        setEditDataProv(null);
        load_data_providers();
        return response.data;

    } catch (error) {
        const erorCodigo= (error.response.data.code);
        alert(erorCodigo,'error');
    }  
};

// Delete Provider //
const deleteProvider = async(id, load_data_providers) => {
    const config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: endPoints.providers.deleteProviders(id),
    };      
    try {
        const response = await axios(config);
        alert('El proveedor ha sido eliminado.', 'success');
        load_data_providers();
        return response.data;
        
    } catch (error) {
        console.log(error.response.data.message);
        const erorCodigo= (error.response.data.message);
        alert(erorCodigo,'error');
    }
};

export { addProvider, deleteProvider, updateProvider };

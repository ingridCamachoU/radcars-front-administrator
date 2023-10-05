import axios from 'axios';
import { endPoints } from './endPoints/endPoints';
import { alert } from '../utils/alerts2';

// Add Model //
const addModel = async(body,load_Models_products) => {
    const data = JSON.stringify(body);

    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: endPoints.models.getModels,
        headers: {
            'Content-Type': 'application/json',
        },
        data: data,
    };
    try {
        const response = await axios(config);
        alert('Modelo Agregado','success');
        load_Models_products();
        return response.data;
        
    } catch (error) {
        const erorCodigo= (error.response.data.code);
        alert(erorCodigo,'error');
    }
};

// Update Model //
const updateModel = async(id, body, load_Models_products, setEditDataModel) => {
    const data = JSON.stringify(body);
    const config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: endPoints.models.updateModels(id),
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
    };
    try {
        const response = await axios(config);
        alert('Modelo editado con éxito','success');
        setEditDataModel(null);
        load_Models_products();
        return response.data;

    } catch (error) {
        const erorCodigo= (error.response.data.code);
        alert(erorCodigo,'error');
    }  
};

// Delete Model //
const deleteModel = async(id, load_Models_products) => {
    const config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: endPoints.models.deleteModels(id),
    };      
    try {
        const response = await axios(config);
        alert('El modelo ha sido eliminado.', 'success');
        load_Models_products();
        return response.data;
        
    } catch (error) {
        console.log(error.response.data.message);
        const erorCodigo= (error.response.data.message);
        alert(erorCodigo,'error');
    }
};

export { addModel, updateModel, deleteModel };

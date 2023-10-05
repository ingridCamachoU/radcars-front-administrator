import axios from 'axios';
import { endPoints } from './endPoints/endPoints';
import { alert } from '../utils/alerts2';

// Add product //
const addProduct = async(body, load_data_products) => {
    const data = JSON.stringify(body);

    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: endPoints.products.getProducts,
        headers: {
            'Content-Type': 'application/json',
        },
        data: data,
    };
    
    try {
        const response = await axios(config);
        alert('Producto Agregado','success');
        load_data_products();
        return response.data;
        
    } catch (error) {
        const erorCodigo= (error.response.data.code);
        alert(erorCodigo,'error');
    }
};

// Update product //
const updateProduct = async(id, body, load_data_products) => {
    const data = JSON.stringify(body);
    const config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: endPoints.products.updateProduct(id),
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
    };
    try {
        const response = await axios(config);
        alert('Producto Editado con Éxito','success');
        load_data_products();
        return response.data;

    } catch (error) {
        const erorCodigo= (error.response.data.code);
        alert(erorCodigo,'error');
    }  
};

// Delete product //
const deleteProduct = async(id,load_data_products) => {
    const config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: endPoints.products.deleteProduct(id),
    };      
    try {
        const response = await axios(config);
        alert('El producto ha sido eliminado.', 'success');
        console.log(response.data)
        load_data_products();
        return response.data;
        
    } catch (error) {
        console.log(error.response.data.message);
        const erorCodigo= (error.response.data.message);
        alert(erorCodigo,'error');
    }
    
};

export { addProduct, deleteProduct, updateProduct };

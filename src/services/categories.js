import axios from 'axios';
import { endPoints } from './endPoints/endPoints';
import { alert } from '../utils/alerts2';

// Add Categorie //
const addCategorie = async(body, load_Categories_products) => {
    const data = JSON.stringify(body);

    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: endPoints.categories.getCategories,
        headers: {
            'Content-Type': 'application/json',
        },
        data: data,
    };
    try {
        const response = await axios(config);
        alert('Categoría Agregada','success');
        load_Categories_products();
        return response.data;
        
    } catch (error) {
        const erorCodigo= (error.response.data.code);
        alert(erorCodigo,'error');
    }
};

// Update Categorie //
const updateCategorie = async(id, body, load_Categories_products, setEditDataCategorie) => {
    const data = JSON.stringify(body);
    const config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: endPoints.categories.updateCategories(id),
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
    };
    try {
        const response = await axios(config);
        alert('Categoría editada con éxito','success');
        setEditDataCategorie(null)
        load_Categories_products();
        return response.data;

    } catch (error) {
        const erorCodigo= (error.response.data.code);
        alert(erorCodigo,'error');
    }  
};

// Delete Categorie //
const deleteCategorie = async(id, load_Categories_products) => {
    const config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: endPoints.categories.deleteCategories(id),
    };      
    try {
        const response = await axios(config);
        alert('La categoria ha sido eliminada.', 'success');
        load_Categories_products();
        return response.data;
        
    } catch (error) {
        console.log(error.response.data.message);
        const erorCodigo= (error.response.data.message);
        alert(erorCodigo,'error');
    }
};

export { addCategorie, deleteCategorie, updateCategorie };

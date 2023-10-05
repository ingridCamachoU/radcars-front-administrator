import axios from 'axios';
import { endPoints } from './endPoints/endPoints';
import { alert } from '../utils/alerts2';

// Add Mark //
const addMark = async(body, load_data_marks) => {
    const data = JSON.stringify(body);

    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: endPoints.marks.getMarks,
        headers: {
            'Content-Type': 'application/json',
        },
        data: data,
    };
    try {
        const response = await axios(config);
        alert('Marca Agregada','success');
        load_data_marks();
        return response.data;
        
    } catch (error) {
        const erorCodigo= (error.response.data.code);
        alert(erorCodigo,'error');
    }
};

// Update Mark //
const updateMark = async(id, body, load_data_marks, setEditDataMark) => {
    const data = JSON.stringify(body);
    const config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: endPoints.marks.updateMarks(id),
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
    };
    try {
        const response = await axios(config);
        alert('Marca editada con éxito','success');
        setEditDataMark(null)
        load_data_marks();
        return response.data;

    } catch (error) {
        const erorCodigo= (error.response.data.code);
        alert(erorCodigo,'error');
    }  
};

// Delete Categorie //
const deleteMark = async(id, load_data_marks) => {
    const config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: endPoints.marks.deleteMarks(id),
    };      
    try {
        const response = await axios(config);
        alert('La Marca ha sido eliminada.', 'success');
        load_data_marks();
        return response.data;
        
    } catch (error) {
        console.log(error.response.data.message);
        const erorCodigo= (error.response.data.message);
        alert(erorCodigo,'error');
    }
};

export { addMark, deleteMark, updateMark };

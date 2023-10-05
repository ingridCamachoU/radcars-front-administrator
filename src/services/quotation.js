import axios from 'axios';
import { endPoints } from './endPoints/endPoints';
import { alert } from '../utils/alerts2';

// Add Quotation //
const addQuotation = async(body, idProduct, setIsOpenModalCreateQuotation) => {
    const data = JSON.stringify(body);

    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: endPoints.quotations.getQuotations(idProduct),
        headers: {
            'Content-Type': 'application/json',
        },
        data: data,
    };
    
    try {
        const response = await axios(config);
        alert('Cotización Agregada','success');
        setIsOpenModalCreateQuotation(false);
        return response.data;
        
    } catch (error) {
        const erorCodigo= (error.response.data.code);
        alert(erorCodigo,'error');
    }
    return response.data;
};

// Delete Quotation //
const deleteQuotation = async(idQuotation, idProduct)=>{
    const config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: endPoints.quotations.deleteQuotations(idQuotation, idProduct),
    };      
    try {
        const response = await axios(config);
        alert('La cotización ha sido eliminada.', 'success');
        return response.data;
        
    } catch (error) {
        console.log(error.response.data.message);
        const erorCodigo= (error.response.data.message);
        alert(erorCodigo,'error');
    }
};

export { addQuotation, deleteQuotation };

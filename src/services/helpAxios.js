import axios from 'axios';
import { alert } from '../utils/alerts';

export const helpAxios = async({url, method, body, title, icon, loadData = null}) => {
    
    const data = JSON.stringify(body);
    let header;
    if(method !== 'DELETE'){
        header = {
            'Content-Type': 'application/json',
        };
    }
    
    const config = {
        method: method,
        maxBodyLength: Infinity,
        url: url,
        headers: header,
        data: data,
    };
    
    try {
        const response = await axios(config);
        alert(title, icon);
        if(loadData){
            loadData();
        }
        return response.data;
        
    } catch (error) {
        const errorCodigo= error.response.data.message;
        console.log(error)
        alert(errorCodigo,'error');
    }
};
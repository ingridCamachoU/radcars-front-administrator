import { useState } from "react";

export const useFetch = (url, token = null) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const loadingData = (method = 'GET') => {
        const abortController = new AbortController();
        const signal = abortController.signal;
    
        const fetchData = async () => {
            setLoading(true);
    
            const headers = {
                'Content-Type': 'application/json',
            };
        
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }
            try {
                const res = await fetch(url, {
                    method: method,
                    headers: headers,
                    signal: signal
                });
        
                if (!res.ok) {
                    let err = new Error("Error en la petición Fetch");
                    err.status = res.status || "00";
                    err.statusText = res.statusText || "Ocurrió un error";
                    throw err;
                }
        
                const data = await res.json();
        
                if (!signal.aborted) {
                    setData(data);
                    setError(null);
                }
            } catch (error) {
                if (!signal.aborted) {
                    setData([]);
                    setError(error);
                }
            } finally {
                if (!signal.aborted) {
                    setLoading(false);
                }
            }
        };
    
        fetchData();
    
        return () => abortController.abort();
    };

    return { data, loading, error, loadingData };
};



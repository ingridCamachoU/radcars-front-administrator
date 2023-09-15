import { useState } from "react";


export const useForm = (initialForm) => {
  
    const [formData, setFormData] = useState(initialForm);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    };

    const handleReset =() =>{
        setFormData(initialForm);
    };

    return [formData, handleChange, setFormData, handleReset];
}



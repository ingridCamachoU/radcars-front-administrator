import { useState } from "react";

export function useUserTaks() {

    const [dataTaks, setDataTaks] = useState(JSON.parse(localStorage.getItem('dataTaks')) || []);

    // Save Data LocalStorage
    const saveLocalData = () =>{
        localStorage.setItem('dataTaks', JSON.stringify(dataTaks));
    };
    saveLocalData();
  
    const [searchValue, setSearhValue] = useState('')

    // Search Taks
    const searchTask = dataTaks.filter( dataTaks => (
        dataTaks.title.toLowerCase().includes(searchValue.toLowerCase())
    ));

    // Complete Taks
    const onComplete = (id) => {
        const newData = [...dataTaks];
        const dataIndex= newData.findIndex(taks => taks.id === id);
        
        if(newData[dataIndex].completed){
            newData[dataIndex].completed = false;
        }else{
            newData[dataIndex].completed = true;
        }
        setDataTaks(newData);
    };

    const completedTaks = dataTaks.filter(taks => !!taks.completed).length;

    const totalTaks = dataTaks.length;

    // Deelte Taks
    const deleteTaks = (id) => {
        const newData = [...dataTaks];
        const dataIndex= newData.findIndex(taks => taks.id === id);
        newData.splice(dataIndex, 1)
        setDataTaks(newData);
    };

    //Modal -Open/close
    const [openModal, setOpenModal] = useState(false);
    const [datosModal, setDatosModal] = useState('');

    const controlModal = (id) => {
        const newData = [...dataTaks];
        const dataIndex= newData.findIndex(taks => taks.id === id);
        setOpenModal(true);
        setDatosModal(newData[dataIndex]);
    };

    const closeModal = () => {
        setOpenModal(false);
    };

    // Create new taks
    const createTaks = (newDato) => {
        setDataTaks([...dataTaks, newDato])
    };

    return{
        dataTaks,
        setDataTaks,
        setSearhValue,
        searchTask,
        onComplete,
        searchValue,
        completedTaks,
        totalTaks,
        deleteTaks,
        openModal,
        closeModal,
        datosModal,
        controlModal,
        createTaks
    }
}
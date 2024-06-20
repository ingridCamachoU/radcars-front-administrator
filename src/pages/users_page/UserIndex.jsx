import { useContext, useEffect, useState } from "react";
import HeaderPages from "../../components/headerPages/HeaderPages";
import LayoutBase from "../../layout/LayoutBase";
import FormAddUser from "./FormAddUser";
import { DarkMode } from "../../context/DarkMode";
import { endPoints } from "../../services/endPoints/endPoints";
import { useFetch } from "../../hooks/useFetch";
import { useModal } from "../../hooks/useModal";
import TableUsers from "./TableUsers";

const UserIndex = () => {

    const { token } = useContext(DarkMode);
    
    const [ isOpenModalAddUser, setIsOpenModalAddUser ] = useModal();
    const [editDataUser, setEditDataUser] = useState(null);
    const [title, setTitle]= useState('');

    //--- Load Data Product---//
    const urlUser = endPoints.users.getUser;
    const {data:dataUser, loading, error, loadingData: loadDataUser} = useFetch(urlUser, token);

    useEffect(() => {
        loadDataUser();
    },[urlUser, token]);

    const add = () => {
        setTitle('Crear Usuario');
        setIsOpenModalAddUser(true);
    }

    return (
        <LayoutBase>
            <div 
                className='lg:w-4/5 w-full lg:ml-60 max-w-screen-xl flex justify-center h-full pr-4 mt-6 ml-10'>
                <HeaderPages 
                    title={'Usuarios'} 
                    onClick={add}/>
            </div>

            <FormAddUser 
                editDataUser={editDataUser}
                isOpenModalAddUser={isOpenModalAddUser} 
                loadDataUser={loadDataUser}
                setEditDataUser={setEditDataUser}
                setIsOpenModalAddUser={setIsOpenModalAddUser} 
                title={title}
            />

            <div className='lg:relative overflow-x-auto lg:w-4/5 lg:ml-60 lg:mr-8 w-full ml-8 mr-4 mt-6 rounded-lg justify-center items-center flex pb-4'>
                <TableUsers 
                    dataUser={dataUser}
                    loadDataUser={loadDataUser}
                    setIsOpenModalAddUser={setIsOpenModalAddUser} 
                    setEditDataUser={setEditDataUser} 
                    setTitle={setTitle}
                    loading={loading}
                    error={error}/>
            </div>  
        </LayoutBase>

    );
}

export default UserIndex;

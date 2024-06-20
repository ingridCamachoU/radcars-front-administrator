import { useState } from "react";

export const useModal = () => {

    //Modal Product//
    const [isOpenModalAddProduct, setIsOpenModalAddProduct] = useState(false);
    const [isOpenModalEditProduct, setIsOpenModalEditProduct] = useState(false);

    //Modal Quotation//
    const [isOpenModalCreateQuotation, setIsOpenModalCreateQuotation] = useState(false);

    //Modal Details Product//
    const [isOpenModalDetailProduct, setIsOpenModalDetailProduct] = useState(false);

    //Modal Mark//
    const [isOpenModalCreateMark, setIsOpenModalCreateMark] = useState(false);

    //Modal Model//
    const [isOpenModalCreateModel, setIsOpenModalCreateModel] = useState(false);

    //Modal Categorie//
    const [isOpenModalCreateCategorie, setIsOpenModalCreateCategorie] = useState(false);

    //Modal Provider//
    const [ isOpenModalAddProv, setIsOpenModalAddProv ] = useState(false);

    //Modal Provider//
    const [ isOpenModalAddUser, setIsOpenModalAddUser ] = useState(false);

    return [
        isOpenModalAddProduct, 
        setIsOpenModalAddProduct, 
        isOpenModalEditProduct, 
        setIsOpenModalEditProduct, 
        isOpenModalCreateQuotation,  
        setIsOpenModalCreateQuotation,  
        isOpenModalCreateMark,
        setIsOpenModalCreateMark, 
        isOpenModalDetailProduct, 
        setIsOpenModalDetailProduct,
        isOpenModalCreateModel,
        setIsOpenModalCreateModel,
        isOpenModalCreateCategorie,
        setIsOpenModalCreateCategorie,
        isOpenModalAddProv,
        setIsOpenModalAddProv,
        isOpenModalAddUser,
        setIsOpenModalAddUser
    ];
    
};



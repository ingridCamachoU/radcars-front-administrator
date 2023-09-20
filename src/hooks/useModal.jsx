import { useState } from "react";

export const useModal = () => {

  //Modal Product//
  const [isOpenModalAddProduct, setIsOpenModalAddProduct] = useState(false);
  const [isOpenModalEditProduct, setIsOpenModalEditProduct] = useState(false);

  const openModalAddProduct = () => setIsOpenModalAddProduct(true);
  const closeModalAddProduct = () => setIsOpenModalAddProduct(false);

  const openModalEditProduct = () => setIsOpenModalEditProduct(true);
  const closeModalEditProduct = () => setIsOpenModalEditProduct(false);

  //Modal Quotation//
  const [isOpenModalCreateQuotation, setIsOpenModalCreateQuotation] = useState(false);

  const openModalCreateQuotation = () => setIsOpenModalCreateQuotation(true);
  const closeModalCreateQuotation = () => setIsOpenModalCreateQuotation(false);

  //Modal Mark//
  const [isOpenModalCreateMark, setIsOpenModalCreateMark] = useState(false);

  const openModalCreateMark = () => setIsOpenModalCreateMark(true);
  const closeModalCreateMark = () => setIsOpenModalCreateMark(false);

  return [isOpenModalAddProduct, setIsOpenModalAddProduct, openModalAddProduct, closeModalAddProduct, isOpenModalEditProduct, setIsOpenModalEditProduct, openModalEditProduct, closeModalEditProduct, isOpenModalCreateQuotation, openModalCreateQuotation, closeModalCreateQuotation, setIsOpenModalCreateQuotation,  isOpenModalCreateMark,setIsOpenModalCreateMark, openModalCreateMark, closeModalCreateMark];
  
};



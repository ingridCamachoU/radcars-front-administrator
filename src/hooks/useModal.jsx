import { useState } from "react";

export const useModal = () => {

  const [isOpenModalAddProduct, setIsOpenModalAddProduct] = useState(false);

  const openModal = () => setIsOpenModalAddProduct(true);
  const closeModal = () => setIsOpenModalAddProduct(false);

  return [isOpenModalAddProduct, setIsOpenModalAddProduct, openModal, closeModal];
  
};



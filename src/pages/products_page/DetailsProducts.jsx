import { useContext } from "react";
import { DarkMode } from "../../context/DarkMode";
import { XMarkIcon } from "@heroicons/react/24/solid";
import sinImagen from '../../assets/sin-imagen.png'

// eslint-disable-next-line react/prop-types
const DetailsProducts = ({ isOpenModalDetailProduct, editDataProduct, datasQuotation, setIsOpenModalDetailProduct }) => {

    const closeModalReset = () => {
        setIsOpenModalDetailProduct(false);
    };

    const handleModalClick = e => e.stopPropagation();

    const {darkMode} = useContext(DarkMode);

    return (
        <div 
            className= {
                `${isOpenModalDetailProduct  
                    ? 'flex flex-col top-0 items-center justify-center flex-wrap z-40 w-full min-h-screen overflow-auto fixed' 
                    : 'hidden'
                } ${darkMode 
                    ? 'bg-modal-dark' 
                    : 'bg-modal-ligth'
                }`
            }
            onClick={closeModalReset}>
            
            <div className={
                `${isOpenModalDetailProduct && ' shadow-xl lg:p-4 rounded-lg flex absolute flex-col lg:w-[600px] flex-wrap md:w-4/6 sm:w-4/6 w-10/12 p-4  top-16'
                } ${darkMode 
                    ? 'bg-background-dark_medium'
                    : 'bg-background-ligth'
                }`
            }
            onClick={handleModalClick}>
                <div className="flex justify-between mb-6 flex-wrap">
                    <h1 className={
                        `${darkMode 
                            ? 'text-text-ligth text-2xl ml-2' 
                            : 'text-text-black text-2xl ml-2'
                        }`
                    }>Detalles Producto</h1>
                    <span 
                        onClick={closeModalReset}>
                        <XMarkIcon className="h6 w-6 text-text-gray cursor-pointer"/>
                    </span>
                </div>

                <div className="text-text-gray flex mb-4 gap-6 justify-center lg:flex-row flex-col w-full">
                    <div className="flex-col flex w-full">
                        <p>Código</p>
                        <p className="border border-border-gray rounded-lg py-1 px-2">{editDataProduct?.code}</p>
                    </div>
                    
                    <div className="flex-col flex w-full">
                        <p>Nombre</p>
                        <p className="border border-border-gray rounded-lg py-1 px-2">{editDataProduct?.name}</p>
                    </div>                
                </div>
            
                <div className="text-text-gray flex mb-4 gap-6 justify-center lg:flex-row flex-col w-full">
                    <div className=" flex-col flex w-full">
                        <p>Categoria</p>
                        <p className="border border-border-gray rounded-lg py-1 px-2">{editDataProduct?.category.name}</p>   
                    </div>

                    <div className="flex-col flex w-full">
                        <p>Precio</p>
                        <p className="border border-border-gray rounded-lg py-1 px-2">{editDataProduct?.price}</p> 
                    </div>
                </div>

                <div className="text-text-gray flex mb-4 gap-6 justify-center lg:flex-row flex-col w-full">
                    
                    <div className="flex-col flex w-full">
                        <p>% Ganancia</p>
                        <p className="border border-border-gray rounded-lg py-1 px-2">{editDataProduct?.profit}</p>
                    </div>

                    <div className="flex-col flex w-full">
                        <p>Stock</p>
                        <p className="border border-border-gray rounded-lg py-1 px-2">{editDataProduct?.stock}</p>
                    </div>
                </div>

                <div className="text-text-gray flex mb-4 gap-6 justify-center lg:flex-row flex-col w-full">
                    <div className="flex flex-col w-full">
                        <p>Modelo</p>
                        <p className="border border-border-gray rounded-lg py-1 px-2">{editDataProduct?.mark_model.name}</p>
                    </div>
                    <div className="flex flex-col w-full">
                        <p>Transmisión</p>
                        <p className="border border-border-gray rounded-lg py-1 px-2">{editDataProduct?.transmission}</p>
                    </div>
                </div>

                <div className="text-text-gray flex mb-4 gap-6 justify-center lg:flex-row flex-col w-full">
                    <div className="flex flex-col w-full">
                        <p>Imagenes</p>
                        <p className="flex w-full gap-2">
                            <img  
                                className="border border-border-gray p-1 rounded-lg w-[130px] h-[100px]" 
                                alt={editDataProduct?.name} 
                                src={editDataProduct?.images.length > 0 
                                    ? editDataProduct?.images 
                                    : sinImagen
                                }/>
                        </p>      
                    </div>
                    <div className="flex-col flex w-full">
                        <p>Descripción</p>
                        <p className="border border-border-gray rounded-lg py-1 px-2">{editDataProduct?.description}</p>
                    </div>             
                </div>

                <div className="text-text-gray flex mb-4 gap-6 justify-center lg:flex-row flex-col">
                    <div className="w-full">
                        <h3 className={
                            `${darkMode 
                                ? 'text-text-ligth text-2xl mb-4' 
                                : 'text-text-dark text-2xl mb-4'
                            }`
                        }>Cotizaciones
                        </h3>

                        <table className={`${isOpenModalDetailProduct && 'bg-background-ligth w-full'}`}>
                            <thead>
                                <tr className='bg-btn-style text-text-ligth px-2 py-2'>
                                    <th className='px-2 py-2 font-medium'>Proveedor</th>
                                    <th className='px-2 py-2 font-medium'>Precio</th>
                                    <th className='px-2 py-2 font-medium'>Descripción</th>
                                </tr>
                            </thead>

                            <tbody className={`${darkMode ? 'bg-background-dark text-text-ligth text-center' : 'bg-background-ligth text-center'}`}>

                                {   
                                    datasQuotation.length === 0 ? <tr><td colSpan="6" className="text-center">No hay cotizaciones</td></tr>
                                        :datasQuotation?.map( quotation => (
                                            <tr 
                                                key={quotation.id} 
                                                className='border-b'>
                                                <td className='px-2 py-2'>{quotation.provider.name}</td>
                                                <td className='px-2 py-2'>{quotation.price}</td>
                                                <td className='px-2 py-2'>Descripcion</td>
                                            </tr>
                                        ))
                                }

                            </tbody> 
                        </table>
                    </div>            
                </div>            
            </div>     
        </div>
    );
}

export default DetailsProducts;

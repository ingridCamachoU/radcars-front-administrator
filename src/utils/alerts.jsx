import Swal from 'sweetalert2';

//---Alert Error---//
export const alertError = (erorCodigo) =>{
    Swal.fire({
        text: erorCodigo,
        icon: 'error',
        confirmButtonText: 'Ok'
    });
};

//---Alert Success---//
export const alertAdd = (title) =>{
    Swal.fire({
        text: title,
        icon: 'success',
        confirmButtonText: 'Ok'
    });
};

    //---Alert Warning---//
export const alertWarning = (title) =>{
    Swal.fire(
        title,
        response.message,
        'warning'
    )
};


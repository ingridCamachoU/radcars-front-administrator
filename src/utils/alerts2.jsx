import Swal from 'sweetalert2';

export const alert = (title, icon) =>{
    Swal.fire({
        text: title,
        icon: icon,
        confirmButtonText: 'Ok'
    });
};


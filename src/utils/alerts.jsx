import Swal from 'sweetalert2';

export const alert = (title, icon) =>{
    Swal.fire({
        text: title,
        icon: icon,
        confirmButtonText: 'Ok'
    });
};


export const confirAlert = (title, text, icon, textBtn, fuction, config) => {
    Swal.fire({
        title: title,
        text: text,
        icon: icon,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: textBtn
    }).then((result) => {
        if (result.isConfirmed) {
            fuction(config);
        }
    });
};

export const errors = (error) => {
    if (error.code === 'ERR_BAD_REQUEST'){
        alert('Error 404, Página no encontrada!', 'error');
    }
    if (error.code === 'ERR_NETWORK'){
        alert('Algo salió mal, pero no te preocupes, no es tu culpa. Vamos a intentarlo de nuevo.!', 'warning');
    }             
};
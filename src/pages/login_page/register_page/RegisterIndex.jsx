import { Link, useNavigate } from 'react-router-dom';

import { useState } from 'react';
import Swal from 'sweetalert2';
import { useForm } from '../../../hooks/useForm';
import { endPoints } from '../../../services/endPoints/endPoints';

const RegisterIndex = () => {
    const initialFormUser = {
        cc: '',
        name: '',
        phone: '',
        email: '',
        password: '',
        address: '',
        role: 'administrador',
    };

    const [formData, handleChange, setFormData] = useForm(initialFormUser);
    const navigate = useNavigate();

    //---Form Validation---//
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('');
    const onValidate = (formData) => {
        let errors = {};
        let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
        let regexPassword = /^([0-9-A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]){2,20}$/;
        let regexCC = /^[0-9]+$/;
        let regexName = /^([0-9-A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]){2,20}$/;
        let regexPhone = /^[0-9]+$/;

        if (!formData.email.trim()) {
            errors.email = 'El campo "email" no debe ser vacio.';
        } else if (!regexEmail.test(formData.email)) {
            errors.email = 'El campo "email" es incorrecto.';
        }

        if (!formData.name.trim()) {
            errors.name = 'El campo "nombre" no debe ser vacio.';
        } else if (!regexName.test(formData.name)) {
            errors.name = 'El campo "nombre" es incorrecto.';
        }

        if (!formData.cc.trim()) {
            errors.cc = 'El campo "identificación" no debe ser vacio.';
        } else if (!regexCC.test(formData.cc)) {
            errors.cc = 'El campo "identificación" es incorrecto.';
        }

        if (!formData.password.trim()) {
            errors.password = 'El campo "password" no debe ser vacio.';
        } else if (!regexPassword.test(formData.password)) {
            errors.password = 'El campo "password" es incorrecto.';
        }

        if (!formData.phone.trim()) {
            errors.phone = 'El campo "telefono" no debe ser vacio.';
        } else if (!regexPhone.test(formData.phone)) {
            errors.phone = 'El campo "telefono" es incorrecto.';
        }

        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const err = onValidate(formData);
        setErrors(err);
        setServerError('');

        if (Object.keys(err).length === 0) {
            try {
                const response = await fetch(endPoints.users.getUser, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (!response.ok) {
                    const errorData = await response.json();

                    if (
                        errorData.errors &&
                        errorData.errors.some((error) =>
                            error.msg.includes('this user email')
                        )
                    ) {
                        setServerError(
                            'El correo electrónico ya está registrado.'
                        );
                    } else if (
                        errorData.error &&
                        errorData.error.name ===
                            'SequelizeUniqueConstraintError'
                    ) {
                        const uniqueError = errorData.error.errors.find(
                            (error) => error.type === 'unique violation'
                        );
                        if (uniqueError) {
                            if (uniqueError.path === 'cc') {
                                setServerError(
                                    'Ya hay un usuario registrado con esa identificación.'
                                );
                            }
                        }
                    } else {
                        throw new Error(
                            'Error en la solicitud: ' + response.statusText
                        );
                    }
                    return;
                }

                const data = await response.json();
                setFormData(initialFormUser);
                console.log(data);
                Swal.fire({
                    text: 'Registro exitoso',
                    icon: 'success',
                    confirmButtonText: 'Ok',
                });
                navigate('/login');
            } catch (error) {
                console.error('Hubo un problema con la solicitud:', error);
                if (!serverError) {
                    setServerError('Usuario no registrado');
                }
            }
        }
    };

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 w-full">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    REGISTRO
                </h2>
            </div>

            <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm shadow-md p-4">
                <form
                    className="space-y-6"
                    method="POST"
                    onSubmit={handleSubmit}
                >
                    <div>
                        <label className="block font-medium leading-6 text-gray-900">
                            Nombre y apellido *
                        </label>
                        <div className="mt-2">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:leading-6"
                            />
                            {errors.name && (
                                <p className="text-red-600">{errors.name}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block font-medium leading-6 text-gray-900">
                            Identificación *
                        </label>
                        <div className="mt-2">
                            <input
                                id="cc"
                                name="cc"
                                type="text"
                                required
                                value={formData.cc}
                                onChange={handleChange}
                                className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:leading-6"
                            />
                            {errors.cc && (
                                <p className="text-red-600">{errors.cc}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block font-medium leading-6 text-gray-900">
                            Correo electrónico *
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:leading-6"
                            />
                            {errors.email && (
                                <p className="text-red-600">{errors.email}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="user"
                            className="block font-medium leading-6 text-gray-900"
                        >
                            Telefono *
                        </label>
                        <div className="mt-2">
                            <input
                                id="phone"
                                name="phone"
                                type="number"
                                required
                                value={formData.phone}
                                onChange={handleChange}
                                className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:leading-6"
                            />
                            {errors.phone && (
                                <p className="text-red-600">{errors.phone}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="user"
                            className="block font-medium leading-6 text-gray-900"
                        >
                            Dirección *
                        </label>
                        <div className="mt-2">
                            <input
                                id="address"
                                name="address"
                                type="text"
                                required
                                value={formData.address}
                                onChange={handleChange}
                                className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label className="block font-medium leading-6 text-gray-900">
                                Contraseña *
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:leading-6"
                            />
                            {errors.password && (
                                <p className="text-red-600">
                                    {errors.password}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="pt-6">
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md px-3 py-1.5 font-semibold leading-6  shadow-sm bg-blue-950 text-text-ligth hover:shadow-xl hover:bg-blue-960 hover:drop-shadow-xl"
                        >
                            Registrarse
                        </button>
                    </div>
                </form>
                {serverError && (
                    <p className="text-red-600 text-center mt-4">
                        {serverError}
                    </p>
                )}

                <p className="mt-10 text-center text-gray-500">
                    ¿Ya tienes cuenta?
                    <Link
                        to="/"
                        className="pl-2 font-semibold leading-6 text-blue-800 hover:text-blue-900"
                    >
                        Iniciar sesión
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterIndex;

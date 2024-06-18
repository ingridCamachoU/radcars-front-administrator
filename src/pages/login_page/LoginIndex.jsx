import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { endPoints } from '../../services/endPoints/endPoints';
import { DarkMode } from '../../context/DarkMode';
import { useRedirectActiveUser } from '../../hooks/useRedirectActiveUser';
import { useForm } from '../../hooks/useForm';
import logo from '../../assets/logo.svg'

const LoginIndex = () => {

    const initialFormLogin = {
        email: '',
        password: '',
    };
    const [formData, handleChange, setFormData] = useForm(initialFormLogin);

    const { setUser, user, setToken, saveToken } = useContext(DarkMode);
    useRedirectActiveUser(user, '/private');
    const navigate = useNavigate();

    //---Form Validation---//
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('');
    const onValidate = (formData) => {
        let errors = {};
        let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
        let regexPassword = /^([0-9-A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]){2,20}$/;

        if (!formData.email.trim()) {
            errors.email = 'El campo "email" no debe ser vacio.';
        } else if (!regexEmail.test(formData.email)) {
            errors.email = 'El campo "email" es incorrecto.';
        }

        if (!formData.password.trim()) {
            errors.password = 'El campo "password" no debe ser vacio.';
        } else if (!regexPassword.test(formData.password)) {
            errors.password = 'El campo "password" es incorrecto.';
        }

        return errors;
    };

    const validation = () => {
        if (user && user.role === 'administrador') {
            navigate('/private/products');
        }
        return null;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const err = onValidate(formData);
        setErrors(err);
        setServerError('');

        if (Object.keys(err).length === 0) {
            try {
                const response = await fetch(endPoints.login.getLogin, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (!response.ok) {
                    throw new Error(
                        'Error en la solicitud: ' + response.statusText
                    );
                }

                const data = await response.json();

                if (data.data.user) {
                    setUser(data.data.user);
                    setToken(data.data.tokenSession);
                    saveToken(data.data.tokenSession);
                    localStorage.setItem(
                        'userRadAdmin',
                        JSON.stringify(data.data.user)
                    );

                    validation();
                    setFormData(initialFormLogin);
                } else {
                    setServerError('Usuario no registrado');
                }
            } catch (error) {
                console.error(
                    'Hubo un problema con la solicitud de login:',
                    error
                );
                setServerError('Usuario no registrado');
            }
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('tokenRadAdmin');
        if (token) {
            setToken(token);
        }
    }, [setToken]);

    return (
        <div className="flex flex-col justify-center px-6 py-12 lg:px-8 w-full  h-full min-h-screen bg-fondo" >
            <div className="sm:mx-auto max-w-xs flex justify-center">
                <img src={logo} alt="logo"className='w-6/12' />
            </div>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    INICIAR SESIÓN
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm p-4">
                <form
                    className="space-y-6"
                    method="POST"
                    onSubmit={handleSubmit}
                >
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
                                className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:leading-6"
                            />
                            {errors.email && (
                                <p className="text-red-600">{errors.email}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between pt-8">
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
                                className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm sm:leading-6 "
                            />
                            {errors.password && (
                                <p className="text-red-600">
                                    {errors.password}
                                </p>
                            )}
                        </div>
                        <div className=" mt-2">
                            <Link
                                to="/recover"
                                className="font-semibold text-text-blue hover:text-blue-950 flex my-4"
                            >
                                ¿Olvidaste tu contraseña?
                            </Link>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md px-3 py-1.5 font-semibold leading-6  shadow-sm bg-btn-style text-text-ligth hover:shadow-xl hover:bg-blue-960 hover:drop-shadow-xl mt-12 "
                        >
                            Iniciar sesión
                        </button>
                    </div>
                </form>

                {serverError && (
                    <p className="text-red-600 text-center mt-4">
                        {serverError}
                    </p>
                )}

                <p className="mt-10 text-center text-gray-500 flex">
                    ¿No tienes cuenta?
                    <Link
                        to="/register"
                        className="pl-2 font-semibold leading-6 text-text-blue hover:text-blue-900"
                    >
                        Registrate
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginIndex;


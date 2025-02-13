import React, {useContext, useState } from 'react'

import { Link,useNavigate } from 'react-router-dom';
import {useForm} from 'react-hook-form';

import {sessionsService} from '../services/services.js'

import UserContext from '../context/UserContext';

import { FaRegEye,FaRegEyeSlash } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { SiFacebook } from "react-icons/si";

import userIcon from '../assets/img/login/User-icon.png'
import '../styles/pages/Login.css'


const Login = () => {

    const [serverError,setServerError] = useState('');
    
    const {updateSession} = useContext(UserContext);

    const [visible,setVisible] = useState(false);

    const toggleEye = () => {
        setVisible((prev) => !prev);
    };

    const navigate = useNavigate();

    const {register, handleSubmit, formState:{errors}} = useForm();
    const onSubmit = async (data) =>{

        const user = {
            email:data.email,
            password:data.password
        }

        try {
            const result = await sessionsService.loginUser(user);

            if(result.status === 200){
                updateSession();
                navigate('/')
                return;
            }
            
            if(result.status >= 300 & result.status < 500){

                const errorMsg = result.error || "Error desconocido";
                
                if(errorMsg === 'Incorrect credentials'){
                    setServerError('Credenciales incorrectas');
                }else{
                    setServerError(`Error en la autenticacion: ${errorMsg}`);
                }
                return;
            }

            setServerError("Error en el registro. Intente nuevamente.");

        } catch (error) {
            setServerError(`Ocurrió un problema con el servidor.`);
            console.error("Error al iniciar sesión:", error);
        }
    }
    
    return (
        <main className="login">

            <div className="container">

                <div className="login-form">
                    <div className="img">
                        <img src={userIcon} alt="Ícono de usuario" />
                    </div>

                    <h2 className='title'>Iniciar Sesión</h2>

                    <form onSubmit={handleSubmit(onSubmit)} className='form'>
                        
                        <div className="inputbox">
                            <label>Email:</label>
                            <input 
                                className={`${errors.email?.type === 'required' && 'border-red'}`}
                                type="email" 
                                {...register('email',{required:true})}
                            />
                            {
                            errors.email?.type==='required' 
                            && 
                            <p className='error-message'>El campo es obligatorio</p>
                            }
                        </div>
                        <div className="inputbox">
                            <label>Contraseña:</label>

                            <div className="input-password">

                                <input 
                                    className={`${errors.password?.type === 'required' && 'border-red'}`}
                                    type={visible ? 'text' : 'password'} 
                                    {...register('password',{required:true})}
                                />
                                <span 
                                    className='checkbox' 
                                    onClick={toggleEye}
                                >
                                    {visible? <FaRegEye className='eye-icon'/> : <FaRegEyeSlash className='eye-icon'/>}
                                </span>
                                {
                                errors.email?.type==='required' 
                                && 
                                <p className='error-message'>El campo es obligatorio</p>
                                }
                            </div>
                        </div>
                        
                        <button type="submit">Ingresar</button>
                        {
                            serverError && <p className='error-message'>{serverError}</p>
                        }
                    </form>

                    

                </div>
                
                <div className="login-nets">

                        <button className='btn-google'>
                            <FcGoogle /> 
                            Continuar con Google
                        </button>

                        <button className='btn-facebook'>
                            <SiFacebook className='facebook-icon'/> 
                            Continuar con Facebook
                        </button>
                </div>

                <p className='text-register'>
                    ¿Aún no tiene una cuenta gratuita?
                    <Link className='link-register' to='/register'>
                        Cree su cuenta 
                    </Link>
                </p>

            </div>

        </main>
    )
}

export default Login
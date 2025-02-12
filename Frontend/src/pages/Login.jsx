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

    
    const {updateSession} = useContext(UserContext);

    const [visible,setVisible] = useState(false);

    const toggleEye = () => {
        setVisible((prev) => !prev);
    };

    const {register, handleSubmit,reset} = useForm();
    const navigate = useNavigate();

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
            }else{
                console.log('Error en autenticacion: ',result)
            }
        } catch (error) {
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
                            <input type="email" {...register('email',{required:true})}/>
                            
                        </div>
                        <div className="inputbox">
                            <label>Contraseña:</label>

                            <div className="input-password">

                                <input type={visible ? 'text' : 'password'} {...register('password',{required:true})}/>
                                <span 
                                    className='checkbox' 
                                    onClick={toggleEye}
                                >
                                    {visible? <FaRegEye className='eye-icon'/> : <FaRegEyeSlash className='eye-icon'/>}
                                </span>
                                
                            </div>
                        </div>
                        
                        <button type="submit">Ingresar</button>
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
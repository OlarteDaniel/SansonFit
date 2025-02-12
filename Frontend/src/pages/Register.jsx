import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {useForm} from 'react-hook-form';

import { MdOutlineMail } from "react-icons/md";
import { FaCreditCard } from "react-icons/fa";
import { BiCustomize } from "react-icons/bi";
import { RiShoppingBagLine } from "react-icons/ri";
import { FaRegEye,FaRegEyeSlash } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { SiFacebook } from "react-icons/si";

import {sessionsService} from '../services/services';

import '../styles/pages/Register.css'

const Register = () => {

    const [serverError, setServerError] = useState('');

    const navigate = useNavigate();

    const [visible,setVisible] = useState(false);
    const toggleEye = () => {
        setVisible((prev) => !prev);
    };

    const {register, handleSubmit, formState:{errors}} = useForm();
    const onSubmit =  async (data) =>{

        setServerError("");

        const newUser = {
            first_name:data.firstName,
            last_name:data.lastName,
            email:data.email,
            birthdate:data.birthdate,
            password:data.password,
        }

        try {
            const result = await sessionsService.registerUser(newUser);
            console.log("Respuesta del servidor:", result);
            if(result.status === 200){
                navigate('/login')
            }else{
                setServerError("Error en el registro. Intente nuevamente.");
            }
        } catch (error) {
            setServerError(`Ocurrió un problema con el servidor.`);
            console.error("Error al crear usuario:", error);
        }
    }

    return (
        <main className='register'>
            <div className="container">

                <div className="section-info">

                    <h2 className='title'>Descubre los beneficios de crear tu cuenta gratuita</h2>

                    <ul className='feature-list'>
                        <li className='feature'>
                            <MdOutlineMail className='mail-icon icon'/>
                            <span>Recibe ofertas exclusivas y promociones directamente en tu correo electrónico.</span>
                        </li>

                        <li className='feature'>
                            <FaCreditCard  className='card-icon icon'/>
                            <span>Realiza pagos de forma fácil y segura desde nuestra página</span>
                        </li>

                        <li className='feature'>
                            <BiCustomize className='customize-icon icon' />
                            <span>Accede a herramientas personalizadas para optimizar tu experiencia de compra</span>
                        </li>

                        <li className='feature'>
                            <RiShoppingBagLine className='bagline-icon icon'/>
                            <span>Disfruta de una experiencia completa y simplificada en nuestra tienda.</span>
                        </li>

                    </ul>
                </div>

                <div className="section-form">

                    <h2 className='title'>Cree una cuenta gratuita</h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="form">

                        <div 
                            className='inputbox'
                        >
                            <label>Nombre:</label>
                            <input 
                                className={`${errors.firstName?.type==='required' && 'border-red'}`}
                                type="text" 
                                {...register('firstName',{required:true})}
                            />
                            {
                            errors.firstName?.type==='required' 
                            && 
                            <p className='error-message'>El campo es obligatorio</p>
                            }
                        </div>

                        <div className="inputbox">
                            <label>Apellido:</label>
                            <input 
                                className={`${errors.lastName?.type==='required' && 'border-red'}`}
                                type="text" 
                                {...register('lastName',{required:true})}/>
                            {
                            errors.lastName?.type==='required' 
                            && 
                            <p className='error-message'>El campo es obligatorio</p>
                            }
                        </div>

                        <div className="inputbox">
                            <label>Fecha de nacimiento:</label>
                            <input type="date" {...register('birthdate')}/>
                        </div>

                        <div className="inputbox">
                            <label>Email:</label>
                            <input 
                                className={`${errors.email?.type==='required' && 'border-red'}`}
                                type="email" 
                                {...register('email',{required:true})}/>
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
                                    className={`${errors.password?.type==='required' && 'border-red' || errors.password?.type==='minLength' && 'border-red'}`}
                                    type={visible ? 'text' : 'password'} 
                                    {...register('password',
                                        {
                                            required:true,
                                            minLength:8
                                        })}
                        
                                />
                                <span 
                                    className='checkbox' 
                                    onClick={toggleEye}
                                >
                                    {visible? <FaRegEye className='eye-icon'/> : <FaRegEyeSlash className='eye-icon'/>}
                                </span>
                                
                            </div>
                            {
                                errors.password?.type==='required' 
                                && 
                                <p className='error-message'>El campo es obligatorio</p>
                            }
                            {
                                errors.password?.type==='minLength' 
                                && 
                                <p className='error-message'>Contraseña corta, debe tener al menos 8 caracteres</p>
                            }
                        </div>
                        
                        <button type="submit">Comenzar</button>
                        {serverError && <p className="error-message">{serverError}</p>}
                    </form>

                    <div className="register-nets">
                    
                        <button className='btn-google'>
                            <FcGoogle /> 
                            Continuar con Google
                        </button>

                        <button className='btn-facebook'>
                            <SiFacebook className='facebook-icon'/> 
                            Continuar con Facebook
                        </button>
                    </div>

                    <p className='text-login'>
                        ¿Ya tiene una cuenta?
                        <Link className='link-login' to='/login'>
                            Ingresar
                        </Link>
                    </p>

                </div>
            </div>
        </main>
    )
}

export default Register
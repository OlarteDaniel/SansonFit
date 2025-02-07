import React, { useState } from 'react'
import { Link } from 'react-router-dom';

import { MdOutlineMail } from "react-icons/md";
import { FaCreditCard } from "react-icons/fa";
import { BiCustomize } from "react-icons/bi";
import { RiShoppingBagLine } from "react-icons/ri";
import { FaRegEye,FaRegEyeSlash } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { SiFacebook } from "react-icons/si";


import '../styles/pages/Register.css'

const Register = () => {

    const [visible,setVisible] = useState(false);
    
    const toggleEye = () => {
        setVisible((prev) => !prev);
    };

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

                    <form action="" className="form">

                        <div className="inputbox">
                            <label>Nombre:</label>
                            <input type="text" required/>
                        </div>

                        <div className="inputbox">
                            <label>Apellido:</label>
                            <input type="text" required/>
                        </div>

                        <div className="inputbox">
                            <label>Fecha de nacimiento:</label>
                            <input type="date" required/>
                        </div>

                        <div className="inputbox">
                            <label>Email:</label>
                            <input type="email" required/>
                        </div>

                        <div className="inputbox">
                            <label>Contraseña:</label>

                            <div className="input-password">

                                <input type={visible ? 'text' : 'password'} required/>
                                <span 
                                    className='checkbox' 
                                    onClick={toggleEye}
                                >
                                    {visible? <FaRegEye className='eye-icon'/> : <FaRegEyeSlash className='eye-icon'/>}
                                </span>
                                
                            </div>
                        </div>
                        
                        <button type="submit">Comenzar</button>

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
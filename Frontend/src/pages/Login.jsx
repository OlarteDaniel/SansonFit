import React, {useEffect, useState } from 'react'

import { Link } from 'react-router-dom';
import {GoogleLogin} from '@react-oauth/google';
import { useGoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

import {productsService} from '../services/services.js'

import { FaRegEye,FaRegEyeSlash } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { SiFacebook } from "react-icons/si";

import userIcon from '../assets/img/login/User-icon.png'
import '../styles/pages/Login.css'


const Login = () => {

    const [visible,setVisible] = useState(false);
    const [products,setProducts] = useState([]);

    const toggleEye = () => {
        setVisible((prev) => !prev);
    };

    useEffect(()=>{
        const fetchProducts = async()=>{
            const result = await productsService.getProducts();
            console.log(result.data.payload)
        }

        products.length===0&&fetchProducts();

    },[])


    return (
        <main className="login">

            <div className="container">

                <div className="login-form">
                    <div className="img">
                        <img src={userIcon} alt="Ícono de usuario" />
                    </div>

                    <h2 className='title'>Iniciar Sesión</h2>

                    <form action="" className='form'>
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
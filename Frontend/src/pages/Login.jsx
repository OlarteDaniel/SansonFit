import React, {useState } from 'react'

import { Link } from 'react-router-dom';

import { FaRegEye,FaRegEyeSlash } from "react-icons/fa6";

import userIcon from '../assets/img/login/User-icon.png'
import '../styles/pages/Login.css'

const Login = () => {

    const [visible,setVisible] = useState(false);

    const toggleEye = () => {
        setVisible((prev) => !prev);
    };

    return (
        <main className="login">
            
            <div className="container">
                <div className="img">
                    <img src={userIcon} alt="Ícono de usuario" />
                </div>

                <h2 className='title'>Iniciar Sesion</h2>

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
                    
                    <button type="submit">Iniciar Sesion</button>
                </form>
                
                <p className='text-register'>
                    ¿Todavía no ha tenido una cuenta?
                    <Link className='link-register' to='/register'>
                        Crear cuenta 
                    </Link>
                </p>
            </div>
        </main>
    )
}

export default Login
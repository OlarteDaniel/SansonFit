import React, { useState } from 'react'
import { Link } from 'react-router-dom';

import { FaUser } from "react-icons/fa6";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaShoppingCart } from "react-icons/fa";
import { BsXLg } from "react-icons/bs";

import '../styles/components/NavBar.css'
import Logotipo from '../assets/img/Logotipo.png';

const NavBar = () => {

    const [active,setActive] = useState('nav-container');
    const navToggle = () =>{
        active === 'nav-container'
            ? setActive('nav-container nav_active')
            : setActive('nav-container');
    };

    return (
        <header className='navBar'>
            <button onClick={navToggle} className='button-burger' id='btn-burger'>
                <RxHamburgerMenu className='burger-icon'/>
            </button>

            <Link to={'/'}className='link-logo'>
                <img src={Logotipo} alt="" className='logo'/>
            </Link>

            <div className={active}>

                <div className="nav-icons">
                    <button className='button-user'>
                        <FaUser className='user-icon'/>
                    </button>

                    <button onClick={navToggle} className='button-x'>
                        <BsXLg className='x-icon'/>
                    </button>

                </div>
                
                <ul className="nav-list">
                    <li>Inicio</li>
                    <li>Productos</li>
                    <li>Nosotros</li>
                </ul>

            </div>
            
            <button className='button-cart'>
                <FaShoppingCart className='cart-icon' id='btn-cart'/>
            </button>

        </header>
    )
}

export default NavBar
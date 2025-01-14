import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';

import { RxHamburgerMenu } from "react-icons/rx";
import { BsXLg } from "react-icons/bs";

import Cart from './widgets/Cart';
import User from './widgets/User';
import useScroll from '../hooks/useScroll';

import Logotipo from '../assets/img/logos/Logotipo.png';
import LogotipoDeactivate from '../assets/img/logos/LogotipoDeactivate.png' 

import '../styles/components/NavBar.css';

const NavBar = () => {
    const [menuActive, setMenuActive] = useState(false);

    const toggleMenu = () => setMenuActive(!menuActive);

    const isScrolled = useScroll();

    return (
        <header className={`navBar ${isScrolled ? 'abajo' : ''}`}>
            <button onClick={toggleMenu} className="button-burger">
                <RxHamburgerMenu className={`burger-icon ${isScrolled ? 'light' : ''}`} />
            </button>

            <div className="superior">
                <Link to="/" className="link-logo">
                    <img src={LogotipoDeactivate} alt="Logotipo Sanson Fit"  className={`logo ${isScrolled ? 'deactivate' : ''}`}/>
                    <img src={Logotipo} alt="Logotipo Sanson Fit" className={`logo ${isScrolled ? '' : 'deactivate'}`} />
                </Link>

                <div className="buttons">
                    <Cart/>

                    <User ButtonClass="button-user"/>
                </div>
            </div>

            <nav className={`nav-container ${menuActive ? "nav_active" : ""}`}>
                <div className="nav-icons">

                    <button onClick={toggleMenu} className="button-x">
                        <BsXLg className="x-icon" />
                    </button>

                    <User ButtonClass="button-user-active"/>
                    
                </div>

                <ul className={`nav-list ${isScrolled ? 'light' : ''}`}>
                    <li>
                        <Link to="/" className="nav-link">Inicio</Link>
                    </li>
                    <li>
                        <Link to="/products" className="nav-link">Productos</Link>
                    </li>
                    <li>
                        <Link to="#" className="nav-link">Sobre nosotros</Link>
                    </li>
                    <li>
                        <Link to="#" className="nav-link">Contacto</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default NavBar;

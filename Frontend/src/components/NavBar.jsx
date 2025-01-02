import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';

import { FaUser } from "react-icons/fa6";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaShoppingCart } from "react-icons/fa";
import { BsXLg } from "react-icons/bs";

import '../styles/components/NavBar.css';
import Logotipo from '../assets/img/Logotipo.png';
import LogotipoDeactivate from '../assets/img/LogotipoDeactivate.png' 

const NavBar = () => {
    const [menuActive, setMenuActive] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const toggleMenu = () => setMenuActive(!menuActive);

    useEffect(() =>{
        const handleScroll = () =>{
            setIsScrolled(window.scrollY > 0);
        }

        window.addEventListener('scroll',handleScroll);

        return () =>{
            window.removeEventListener('scroll',handleScroll);
        }
    },[]);

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
                    <button className="button-cart">
                        <FaShoppingCart className={`cart-icon ${isScrolled ? 'light' : ''}`} />
                    </button>
                    <button className="button-user">
                        <FaUser className={`user-icon ${isScrolled ? 'light' : ''}`} />
                    </button>
                </div>
            </div>

            <nav className={`nav-container ${menuActive ? "nav_active" : ""}`}>
                <div className="nav-icons">
                    <button className="button-user-active">
                        <FaUser className="user-icon"/>
                    </button>
                    <button onClick={toggleMenu} className="button-x">
                        <BsXLg className="x-icon" />
                    </button>
                </div>

                <ul className={`nav-list ${isScrolled ? 'light' : ''}`}>
                    <li>
                        <Link to="#" className="nav-link">Inicio</Link>
                    </li>
                    <li>
                        <Link to="#" className="nav-link">Productos</Link>
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

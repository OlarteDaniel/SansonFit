import React, { useState, useContext } from 'react';
import { FaShoppingCart } from "react-icons/fa";

import useScroll from '../../hooks/useScroll';

import UserContext from '../../context/UserContext'

import '../../styles/components/widgets/Cart.css'

const Cart = () => {

    const {session} = useContext(UserContext)
    const isScrolled = useScroll();

    const [cartActivate, setCartActivate] = useState(false);

    return (
    session && 
        <button onClick={() => setCartActivate(!cartActivate)} className="button-cart">
            <FaShoppingCart className={`cart-icon ${isScrolled ? 'light' : ''}`} />
            <p className={`stock ${isScrolled ? 'light' : ''}`}>0</p>
        </button>   
    )
}

export default Cart
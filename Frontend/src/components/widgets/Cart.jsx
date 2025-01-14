import React, { useState,useEffect } from 'react';
import { FaShoppingCart } from "react-icons/fa";

import useScroll from '../../hooks/useScroll';

import '../../styles/components/widgets/Cart.css'

const Cart = () => {

    const isScrolled = useScroll();

    return (
        <button className="button-cart">
            <FaShoppingCart className={`cart-icon ${isScrolled ? 'light' : ''}`} />
            <p className={`stock ${isScrolled ? 'light' : ''}`}>0</p>
        </button>
    )
}

export default Cart
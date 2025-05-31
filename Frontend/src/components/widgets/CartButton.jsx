import React, {useContext } from 'react';
import { FaShoppingCart } from "react-icons/fa";

import useScroll from '../../hooks/useScroll';

import UserContext from '../../context/UserContext'
import CartContext from '../../context/CartContext';

import '../../styles/components/widgets/CartButton.css'

const CartButton = () => {

    const {session} = useContext(UserContext)
    const {toggleCart,count} = useContext(CartContext);

    const isScrolled = useScroll();
    
    return (
    session && 
        <button onClick={()=> toggleCart()} className="button-cart">
            <FaShoppingCart className={`cart-icon ${isScrolled ? 'light' : ''}`} />
            <p className={`stock ${isScrolled ? 'light' : ''}`}>{count}</p>
        </button>   
    )
}

export default CartButton
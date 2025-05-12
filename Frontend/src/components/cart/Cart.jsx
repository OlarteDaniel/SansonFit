import React, { useContext, useRef } from 'react'
import { Link } from 'react-router-dom';

import { BsXLg } from "react-icons/bs";
import { FaRegTrashAlt } from "react-icons/fa";

import UserContext from '../../context/UserContext';
import CartContext from '../../context/CartContext';

import useClickOutside from '../../hooks/useClickOutside ';

import '../../styles/components/cart/Cart.css'

const Cart = () => {

    const {cartActivate,cartItems,setCartActivate} = useContext(CartContext);
    const {session} = useContext(UserContext);

    const dropdownRef = useRef(null);

    const resetState = () =>{
        if(cartActivate){
            setCartActivate(false)
        }
    }

    useClickOutside(dropdownRef,resetState);
    
    return (
        session  &&  
        
            <div ref={dropdownRef} className={`cart ${cartActivate? 'activate' : ''}`}>
                
                {
                    cartItems == 0 ?
                        <div className="message">
                            <p>Su carro está vacío</p>
                            <Link onClick={resetState} className='btn-product' to="/products"><button>VOLVER A LA TIENDA</button></Link>
                        </div>
                    
                    :

                    <>
                        <div className="head">
                            <p>Carrito</p>
                            <div className="btns">
                                <button><FaRegTrashAlt className='icon-trash' /></button>
                                <button onClick={resetState}><BsXLg className='icon-x'/></button>
                            </div>
                        </div>

                        <div className="body">
                            
                        </div>
                    </>
                }

            </div>
        
    )
}

export default Cart
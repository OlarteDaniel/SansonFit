import { useContext, useRef } from 'react'
import { Link } from 'react-router-dom';

import CartItem from './CartItem';

import { BsXLg } from "react-icons/bs";
import { FaRegTrashAlt } from "react-icons/fa";

import UserContext from '../../context/UserContext';
import CartContext from '../../context/CartContext';

import useClickOutside from '../../hooks/useClickOutside ';

import '../../styles/components/cart/Cart.css'

const Cart = () => {

    const {cartActivate,cart,setCartActivate,deleteItem,total,emptyCart} = useContext(CartContext);
    const {session} = useContext(UserContext);

    const dropdownRef = useRef(null);

    const resetState = () =>{
        if(cartActivate){
            setCartActivate(false)
        }
    }

    useClickOutside(dropdownRef,resetState);

    const priceFormat = Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(total);

    return (
        session  &&  
            
            <div ref={dropdownRef} className={`cart ${cartActivate? 'activate' : ''}`}>

                {
                    cart == 0 ?
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
                            {cart.map((item) => {
                                return <CartItem 
                                        key={`${item.productTitle}-${item.flavor}`}
                                        productId={item.productId}
                                        productTitle={item.productTitle}
                                        price={item.price}
                                        image={item.image}
                                        productDiscount={item.productDiscount}
                                        variantDiscount={item.variantDiscount}
                                        flavor={item.flavor}
                                        count={item.count}
                                        deleteItem={deleteItem}
                                        />
                            })}
                        </div>

                        <div className="footer">
                            <div className="total">
                                <p className='price'>Total</p>
                                <p className='finalPrice'>{priceFormat}</p>
                            </div>
                            <div className="btns">
                                <button>Finalizar Compra</button>
                                <button onClick={emptyCart}>Limpiar Carrito</button>
                            </div>
                        </div>

                    </>
                }

            </div>
        
    )
}

export default Cart
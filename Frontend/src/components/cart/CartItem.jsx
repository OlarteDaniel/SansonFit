import React from 'react';
import { BsXLg } from "react-icons/bs";

import '../../styles/components/cart/CartItem.css';

const CartItem = ({productTitle, price, image, productDiscount, variantDiscount, flavor, count,deleteItem}) => {
    const discount = productDiscount + variantDiscount;
    const hasDiscount = discount > 0;

    const discountedPrice = price - (price * (discount / 100));
    const priceFormat = Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(price);
    const discountedPriceFormat = Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(discountedPrice);

    return (
        <div className='cart-item'>
            <div className="img">
                <img src={image} alt={`${productTitle}-${flavor}`} />
            </div>
            <div className="info">
                <div className="title">
                    <p>{productTitle} ({flavor})</p>
                    <button onClick={() => deleteItem(productTitle, flavor)}><BsXLg className='icon-x' /></button>
                </div>
                <div className="details">
                    <p className='count'>x{count}</p>
                    <div className='prices'>
                        {hasDiscount && <span className="old-price">{priceFormat}</span>}
                        <span className="new-price">{discountedPriceFormat}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;

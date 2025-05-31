import React from 'react'

import useCounter from '../../hooks/useCounter';

import '../../styles/components/widgets/ItemCount.css'

const ItemCount = ({stock,initialValue,addCart}) => {

    const {count, incrementar, decrementar} = useCounter(stock, initialValue);

    return (
        <div className='counter'>
            <div className="quantity">
                <button onClick={decrementar} className='btn'>-</button>
                <h2>{count}</h2>
                <button onClick={incrementar} className='btn'>+</button>
            </div>
            <button onClick={()=> addCart(count)} className='btn-cart'>Añadir al carrito</button>
        </div>
    )
    }

export default ItemCount
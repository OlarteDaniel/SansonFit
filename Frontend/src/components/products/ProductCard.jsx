import React from 'react'
import { Link } from 'react-router-dom';

import Creatina from '../../assets/img/productsList/Creatina-Start.png'
import { HiMagnifyingGlass } from "react-icons/hi2";

import '../../styles/components/products/ProductCard.css'

const ProductCard = ({title,price}) => {
    
    const priceFormat = Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(price);

    return (
        //Acabamos de remplazar un div por el link , en caso de fallar reemplazar el Link por el div //
        <Link className='card'>  
            <div className="card-product">
                <div className="img">
                    <button className='button-glass'>
                        <HiMagnifyingGlass className='glass-icon'/>
                    </button>
                    <img src={Creatina} alt="" />
                    <button className='button-buys'>Comprar</button>
                </div>
            </div>
            <div className="card-details">
                <div className="title">
                    <h3>{title}</h3>
                </div>
                <div className="price">
                    <p>{priceFormat}</p>
                </div>
            </div>
        </Link>
    )
}

export default ProductCard
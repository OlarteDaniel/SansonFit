import React from 'react'
import { Link } from 'react-router-dom';

import Creatina from '../../assets/img/productsList/Creatina-Start.png'

import '../../styles/components/products/ProductCard.css'

const ProductCard = ({title,price}) => {
    
    const priceFormat = Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(price);

    return (
        <div className='card'>
            <div className="card-product">
                <Link to='/' className='img'>
                    <img src={Creatina} alt="" />
                    <button>Comprar</button>
                </Link>
            </div>
            <div className="card-details">
                <div className="title">
                    <h3>{title}</h3>
                </div>
                <div className="price">
                    <p>{priceFormat}</p>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
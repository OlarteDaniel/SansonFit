import React from 'react'

import Creatina from '../../assets/img/productsList/Creatina-Start.png'

import '../../styles/components/products/ProductCard.css'

const ProductCard = ({title,price}) => {
    return (
        <div className='card'>
            <div className="img">
                <img src={Creatina} alt="" />
            </div>
            <div className="title">
                <h3>{title}</h3>
            </div>
            <div className="price">
                <p>${price}</p>
            </div>
            <button>Ver detalles</button>
        </div>
    )
}

export default ProductCard
import React, { useEffect, useState, useContext } from 'react'

import ProductCard from './ProductCard'

import UserContext from '../../context/UserContext';
import ProductContext from '../../context/ProductContext';

import { productsService } from '../../services/services';

import notProduct from '../../assets/img/logos/User-icon-not-products.png'

import '../../styles/components/products/ProductGrid.css'


const ProductGrid = () => {

    const {products} = useContext(ProductContext);

    return (
        
        products?.length?
            <div className='grid' >
                {products.map((product, index) =>(
                    <ProductCard key={product._id || index} id={product._id} title={product.title} price={product.price}/>
                ))}
            </div>
        :
            <div className="img-notProducts">
                <img src={notProduct} alt="Not Product Image" />
                <p className='textNotProduct'>No hay productos actualmente!!!</p>
            </div>
    )
}

export default ProductGrid
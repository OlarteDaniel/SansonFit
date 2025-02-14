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
        <div className='grid' >
            {products.map((product) =>(
                <ProductCard key={product._id} id={product._id} title={product.title} price={product.price}/>
            ))}
        </div>
    )
}

export default ProductGrid
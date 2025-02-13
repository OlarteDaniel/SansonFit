import React, { useEffect, useState, useContext } from 'react'

import ProductCard from './ProductCard'

import UserContext from '../../context/UserContext';

import { productsService } from '../../services/services';

import notProduct from '../../assets/img/logos/User-icon-not-products.png'

import '../../styles/components/products/ProductGrid.css'


const ProductGrid = () => {

    const {session} = useContext(UserContext);
    const [products,setProducts] = useState([]);

    useEffect(()=>{

        const fetchProducts = async () =>{
            const result = await productsService.getProducts();
            setProducts(result.data.payload);
        }

        products.length===0&&fetchProducts();        
        
    },[])

    return (
        <div className='grid' >
            {products.map((product) =>(
                <ProductCard key={product._id} title={product.title} price={product.price}/>
            ))}
        </div>
    )
}

export default ProductGrid
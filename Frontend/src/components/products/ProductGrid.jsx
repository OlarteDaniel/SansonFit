import React, { useContext, useMemo } from 'react'
import { Link } from 'react-router-dom';

import ProductCard from './ProductCard'

import UserContext from '../../context/UserContext';
import ProductContext from '../../context/ProductContext';


import notProduct from '../../assets/img/logos/User-icon-not-products.png'

import '../../styles/components/products/ProductGrid.css'

const ProductGrid = () => {

    const {products} = useContext(ProductContext);
    const {session} = useContext(UserContext);

    const userRole = session?.data?.payload?.role;
    
    // Esta logica consiste en que si el rol del usuario es admin, que la lista de productos siga siendo 'products'
    // Caso contrario que se obtenga un array nuevo donde se filtren aquellos que tengan 'globalStatus' en true,
    // si no hay ningun producto con 'globalStatus' en true se retorna un array vacio []
    const filteredProducts = useMemo(() =>{
        if(userRole==='admin') return products;
        return products?.filter(product => product.globalStatus) || []
    },[userRole,products])
    

    return (
        filteredProducts.length > 0 ? (
            <div className="grid">
                {filteredProducts.map((product) => {
                    return <ProductCard 
                            key={product._id || product.code} 
                            id={product._id} 
                            title={product.title} 
                            price={product.price} 
                            status={product.globalStatus} 
                            />  
                })}
            </div>
        ) : (
            <div className="img-notProducts">
                <img src={notProduct} alt="Not Product Image" />
                <p className="textNotProduct">No hay productos actualmente!!!</p>
                {userRole==='admin' && 
                    <Link to='/register/product'>
                        <button>Agregar Productos </button>
                    </Link>
                }
            </div>
        )
    );
};

export default ProductGrid
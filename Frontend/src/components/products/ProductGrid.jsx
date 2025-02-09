import React, { useEffect, useState } from 'react'

import ProductCard from './ProductCard'

import { productsService } from '../../services/services';

import notProduct from '../../assets/img/logos/User-icon-not-products.png'

import '../../styles/components/products/ProductGrid.css'


const ProductGrid = () => {

    const [products,setProducts] = useState([]);
    const [quantity,setQuantity] = useState(false);


    useEffect(()=>{

        const fetchProducts = async () =>{
            const result = await productsService.getProducts();
            setProducts(result.data.payload);
            setQuantity(products.length > 0);
        }

        products.length===0&&fetchProducts();        
        
    },[])

    // const products = [
    //     {
    //         _id: '675a04813fb6e50d413bbe91',
    //         title: 'Proteína Whey Power',
    //         description: "Es una proteína de alta calidad",
    //         code: "CS01",
    //         price: 18317,
    //     },
    //     {
    //         _id: '675a04813fb6e50d413bbe92',
    //         title: 'Aminoácidos BCAA Max',
    //         description: "Es una creatina de caballo",
    //         code: "CS01",
    //         price: 15290,
    //     },
    //     {
    //         _id: '675a04813fb6e50d413bbe93',
    //         title: 'Glutamina Ultra Pro',
    //         description: "Es una creatina de caballo",
    //         code: "CS01",
    //         price: 23976,
    //     },
    //     {
    //         _id: '675a04813fb6e50d413bbe94',
    //         title: 'Óxido Nítrico Boost',
    //         description: "Es una creatina de caballo",
    //         code: "CS01",
    //         price: 7030,
    //     },
    //     {
    //         _id: '675a04813fb6e50d413bbe95',
    //         title: 'Pre-Entrenamiento Nitro',
    //         description: "Es una creatina de caballo",
    //         code: "CS01",
    //         price: 13360,
    //     },
    //     {
    //         _id: '675a04813fb6e50d413bbe96',
    //         title: 'Caseína Night Build',
    //         description: "Es una creatina de caballo",
    //         code: "CS01",
    //         price: 27900,
    //     },
    //     {
    //         _id: '675a04813fb6e50d413bbe81',
    //         title: 'Creatina Monohidrato 500g',
    //         description: "Es una creatina de caballo",
    //         code: "CS01",
    //         price: 15290,
    //     },
    //     {
    //         _id: '675a04813fb6e50d413bbe83',
    //         title: 'Multivitamínico Daily Plus',
    //         description: "Es una creatina de caballo",
    //         code: "CS01",
    //         price: 23976,
    //     },
    //     {
    //         _id: '675a04813fb6e50d413bbe84',
    //         title: 'Colágeno Hidrolizado Max',
    //         description: "Es una creatina de caballo",
    //         code: "CS01",
    //         price: 7030,
    //     },
    //     {
    //         _id: '675a04813fb6e50d413bbe85',
    //         title: 'Quemador de Grasas FitBurn',
    //         description: "Es una creatina de caballo",
    //         code: "CS01",
    //         price: 13360,
    //     },
    //     {
    //         _id: '675a04813fb6e50d413bbe74',
    //         title: 'Gainer Muscle Builder',
    //         description: "Es una creatina de caballo",
    //         code: "CS01",
    //         price: 44910,
    //     },
    //     {
    //         _id: '675a04813fb6e50d413bbe75',
    //         title: 'Energizante Natural Plus',
    //         description: "Es una creatina de caballo",
    //         code: "CS01",
    //         price: 33562,
    //     }
    // ];
    

    return (

        
        <div className='grid'>
            {products.map((product) =>(
                <ProductCard key={product._id} title={product.title} price={product.price}/>
            ))}

        </div>
    )
}

export default ProductGrid
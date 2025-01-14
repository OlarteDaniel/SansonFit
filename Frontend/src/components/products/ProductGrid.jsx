import React from 'react'

import ProductCard from './ProductCard'

import '../../styles/components/products/ProductGrid.css'

const ProductGrid = () => {

    const products = [
        {
            _id:'675a04813fb6e50d413bbe91',
            title:'Creatina Start Plus 1',
            description: "Es una creatina de caballo",
            code: "CS01",
            price: 1000,
        },{
            _id:'675a04813fb6e50d413bbe92',
            title:'Creatina Start Plus 2',
            description: "Es una creatina de caballo",
            code: "CS01",
            price: 1000,
        },{
            _id:'675a04813fb6e50d413bbe93',
            title:'Creatina Start Plus 3',
            description: "Es una creatina de caballo",
            code: "CS01",
            price: 1000,
        },{
            _id:'675a04813fb6e50d413bbe94',
            title:'Creatina Start Plus 4',
            description: "Es una creatina de caballo",
            code: "CS01",
            price: 1000,
        },{
            _id:'675a04813fb6e50d413bbe95',
            title:'Creatina Start Plus 5',
            description: "Es una creatina de caballo",
            code: "CS01",
            price: 1000,
        },{
            _id:'675a04813fb6e50d413bbe96',
            title:'Creatina Start Plus 6',
            description: "Es una creatina de caballo",
            code: "CS01",
            price: 1000,
        }
    ]

    return (
        <div className='grid'>
            {products.map((product) =>(
                <ProductCard key={product._id} title={product.title} price={product.price}/>
            ))}
        </div>
    )
}

export default ProductGrid
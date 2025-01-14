import React from 'react'

import ProductGrid from '../components/products/ProductGrid';
import SidebarFilters from '../components/filters/SidebarFilters/SidebarFilters';
import SortingDropdown from '../components/filters/SortingDropdown';

import '../styles/pages/ProductsList.css'

const ProductsList = () => {
    return (
        <main className='productsList'>

            <div className="title">
                <h2>PRODUCTOS</h2>
            </div>

            <SidebarFilters/>

            <SortingDropdown/>

            <ProductGrid/>
        </main>
    )
}

export default ProductsList
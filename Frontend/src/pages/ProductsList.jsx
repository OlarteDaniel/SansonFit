import React, { useContext, useState } from 'react';

import UserContext from '../context/UserContext';
import ProductContext from '../context/ProductContext';

import ProductGrid from '../components/products/ProductGrid';
import SidebarFilters from '../components/filters/SidebarFilters/SidebarFilters';
import SortingDropdown from '../components/filters/SortingDropdown';
import ProductVariantPage from '../components/products/ProductVariantPage';

import '../styles/pages/ProductsList.css';

const ProductsList = () => {

    const {session} = useContext(UserContext);
    const {addVariantPage} = useContext(ProductContext)

    return (
        
        <main className="products-list">

            <header className="title-primary">
                <h2>PRODUCTOS</h2>
            </header>
            <aside className="filter-sidebar">
                <SidebarFilters />
            </aside>
            <section className="sorting-dropdown">
                <SortingDropdown />
            </section>
            <section className="product-grid">
                <ProductGrid />
            </section>
            <section className={`product-variant-page ${addVariantPage? 'activate':''}`}>
                <ProductVariantPage/>
            </section>
        </main>
    );
};

export default ProductsList;

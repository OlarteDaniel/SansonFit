import React from 'react';

import ProductGrid from '../components/products/ProductGrid';
import SidebarFilters from '../components/filters/SidebarFilters/SidebarFilters';
import SortingDropdown from '../components/filters/SortingDropdown';

import '../styles/pages/ProductsList.css';

const ProductsList = () => {
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
        </main>
    );
};

export default ProductsList;

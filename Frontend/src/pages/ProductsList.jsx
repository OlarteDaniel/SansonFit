import React, { useContext } from 'react';

import ProductContext from '../context/ProductContext';

import ProductGrid from '../components/products/ProductGrid';
import ProductPaginate from '../components/products/ProductPaginate'
import SidebarFilters from '../components/filters/SidebarFilters/SidebarFilters';
import SortingDropdown from '../components/filters/SortingDropdown';
import ProductVariantPage from '../components/products/ProductVariantPage';

import { Toaster } from 'sonner';

import '../styles/pages/ProductsList.css';

const ProductsList = () => {

    const {product} = useContext(ProductContext)

    return (
        
        <main className="products-list">

            <Toaster 
                theme='system'
                richColors
                closeButton
            />

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
            <section className="number-paginate">
                <ProductPaginate />
            </section>
            <section className={`product-variant-page ${product? 'activate':''}`}>
                <ProductVariantPage/>
            </section>
        </main>
    );
};

export default ProductsList;

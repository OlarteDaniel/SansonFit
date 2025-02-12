import React, { useContext } from 'react';

import UserContext from '../context/UserContext';

import ProductGrid from '../components/products/ProductGrid';
import SidebarFilters from '../components/filters/SidebarFilters/SidebarFilters';
import SortingDropdown from '../components/filters/SortingDropdown';

import '../styles/pages/ProductsList.css';

const ProductsList = () => {

    const {session} = useContext(UserContext);
    // console.log(session?.data.payload.role)

    return (
        
        <main className="products-list">

            <p>{session?.data.payload.role}</p>

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

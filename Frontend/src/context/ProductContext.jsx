import React, {useState,createContext, useEffect} from "react";

import { productsService } from '../services/services';

const Context = createContext();

export const ProductContextProvider = ({children}) =>{

    const [products,setProducts] = useState([]);

    useEffect(()=>{    
        fetchProducts();
    },[])

    const fetchProducts = async () =>{
        const result = await productsService.getProducts();
        setProducts(result.data.payload);
    }

    const deleteProduct = async (id) =>{
        await productsService.deleteProduct(id);
        setProducts(products.filter(product => product._id !== id));
    }

    return (
        <Context.Provider
        value={{
            products,
            deleteProduct
        }}
        >
            {children}
        </Context.Provider>
    )

}

export default Context;
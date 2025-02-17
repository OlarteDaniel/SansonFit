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

    const addProducts = async (productFormData) =>{
        let productObject = {};
        productFormData.forEach(function(value, key){
            productObject[key] = value;
        });

        try {
            const response = await productsService.createProduct(productFormData);
            if(response.status===200){
                setProducts(prevProducts => [...prevProducts,productObject]);
            }
        } catch (error) {
            console.error("Error al agregar producto:", error);
        }
        
    }

    const deleteProduct = async (id) =>{
        await productsService.deleteProduct(id);
        setProducts(products.filter(product => product._id !== id));
    }

    return (
        <Context.Provider
        value={{
            products,
            addProducts,
            deleteProduct
        }}
        >
            {children}
        </Context.Provider>
    )

}

export default Context;
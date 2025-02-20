import React, {useState,createContext, useEffect} from "react";

import { productsService } from '../services/services';

const Context = createContext();

export const ProductContextProvider = ({children}) =>{

    const [products,setProducts] = useState([]);
    const [addVariantPage,setAddVariantPage] = useState(null);

    useEffect(()=>{    
        fetchProducts();
    },[])

    const fetchProducts = async () =>{
        const result = await productsService.getProducts();
        setProducts(result.data.payload);
    }

    const activeVariant = (productId=null) =>{
        setAddVariantPage(productId)
    }

    const addProducts = async (productFormData) =>{
        let productObject = {};
        productFormData.forEach(function(value, key){
            productObject[key] = value;
        });

        try {
            const response = await productsService.createProduct(productFormData);
            if(response.status===201){
                setProducts(prevProducts => [...prevProducts,response.data.payload]);
            }
        } catch (error) {
            console.error("Error al agregar producto:", error);
        }
        
    }

    const deleteProduct = async (id) =>{
        try {
            const response = await productsService.deleteProduct(id);
            if(response.status===200){
                setProducts(products.filter(product => product._id !== id));
            }
        } catch (error) {
            console.log('Error al eliminar el producto',error);
        }
    }

    

    return (
        <Context.Provider
        value={{
            addVariantPage,
            products,
            activeVariant,
            addProducts,
            deleteProduct
        }}
        >
            {children}
        </Context.Provider>
    )

}

export default Context;
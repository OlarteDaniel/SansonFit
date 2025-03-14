import React, {useState,createContext, useEffect} from "react";

import { productsService, categoryService } from '../services/services';
import useScrollLock from "../hooks/useScrollLock";

import { toast } from 'sonner'

const Context = createContext();

export const ProductContextProvider = ({children}) =>{

    const [product,setProduct] = useState(null);
    const [category,setCategory] = useState('');
    const [products,setProducts] = useState([]);

    const [toggle] = useScrollLock();

    useEffect(()=>{    
        fetchProducts();
    },[])

    const fetchProducts = async () =>{
        try {
            const result = await productsService.getProducts();
            if(result.status === 200 && result.data?.payload){
                setProducts(result.data.payload);
                return;
            }
            setProducts([]);
        } catch (error) {
            setProducts([]);
            console.error('Error al obtener productos:', error)
        }
    }

    const activeVariant = async (productId=null) =>{
        try {
            if(productId){
                const result = await productsService.getProductById(productId);
                if(result.status === 200 && result.data?.payload){
                    const resultCategory = await categoryService.getCategoryById(result.data.payload.category);
                    if(resultCategory){
                        setProduct(result.data.payload);
                        setCategory(resultCategory.data.payload);
                        toggle()
                    }
                }
            }else{
                setProduct(null)
                setCategory('')
                toggle()
            }
            
        } catch (error) {
            setProduct(null);
            setCategory('');
            // console.error('Error al obtener el producto:', error)
        }        
    }

    const addProducts = async (productFormData) =>{
        try {
            await toast.promise( 
                productsService.createProduct(productFormData),
                {
                    loading:'Creando Producto...',
                    success: (res) => {
                        const productTitle = res.data?.payload?.title || 'Sin nombre';
                        setProducts((prevProducts) => [...prevProducts, res.data.payload])                        
                        return `El producto ${productTitle} ha sido creado`;
                    },
                    error:'Error al crear el producto',
                }
            )
        } catch (error) {
            console.error("Error al agregar producto:", error);
            toast.error("No se pudo crear el producto.");
            return
        }
        
    }

    const deleteProduct = async (id) =>{
        try {

            await toast.promise(
                productsService.deleteProduct(id),
                {
                    loading:'Borrando Producto...',
                    success: () => {
                        setProducts(products.filter(product => product._id !== id));
                        return 'El producto ha sido eliminado correctamente';
                    },
                    error:'Error al eliminar el producto',
                }
            )
            
        } catch (error) {
            console.log('Error al eliminar el producto',error);
            toast.error("No se pudo eliminar el producto.");
            return
        }
    }

    

    return (
        <Context.Provider
        value={{
            category,
            product,
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
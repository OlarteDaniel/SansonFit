import React, {useState,createContext, useEffect} from "react";

import { productsService, categoryService} from '../services/services';
import useScrollLock from "../hooks/useScrollLock";

import { toast } from 'sonner'

const Context = createContext();

export const ProductContextProvider = ({children}) =>{

    const [product,setProduct] = useState(null);
    const [category,setCategory] = useState('');
    const [products,setProducts] = useState([]);
    const [paginate,setPaginate] = useState({});
    const [sorting, setSorting] = useState({ field: 'title', order: 'asc' });

    const [toggle] = useScrollLock();

    useEffect(()=>{    
        fetchProducts();
    },[sorting])

    const fetchProducts = async (page=1, sort = sorting) =>{
        try {
            const result = await productsService.getProducts(page,sort.field,sort.order);
            if(result.status === 200 && result.data?.payload){
                setProducts(result.data.payload.docs);
                setPaginate({prevPage: result.data.payload.prevPage,
                            nextPage: result.data.payload.nextPage,
                            totalPages: result.data.payload.totalPages,
                            limit: result.data.payload.limit
                });
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

    const updateProduct = async (id, updatedData) => {
        try {
            await toast.promise(
                productsService.updateProduct(id, updatedData),
                {
                    loading: "Actualizando Producto...",
                    success: (() =>{
                        fetchProducts();
                        return 'Producto actualizado'
                    }),
                    error: "Error al actualizar el producto",
                }
            );
    
            // Actualizar el estado de los productos sin necesidad de recargar la página
            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product._id === id ? { ...product, ...updatedData } : product
                )
            );
    
        } catch (error) {
            console.error("Error al actualizar el producto:", error);
            toast.error("No se pudo actualizar el producto.");
        }
    };

    return (
        <Context.Provider
        value={{
            category,
            fetchProducts,
            paginate,
            product,
            products,
            activeVariant,
            addProducts,
            deleteProduct,
            updateProduct,
            sorting,
            setSorting
        }}
        >
            {children}
        </Context.Provider>
    )

}

export default Context;
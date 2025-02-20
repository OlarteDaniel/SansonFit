import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import {productsService} from '../services/services';

const AddVariant = () => {

    const {pid} = useParams();
    const [product,setProduct] = useState(null);

    useEffect(() => {

        const fetchProduct = async () =>{
            try {
                const response = await productsService.getProductById(pid);
                setProduct(response.data.payload);
            } catch (error) {
                console.log(error)
            }
        }

        fetchProduct();
    },[])

    
    return (
        <main className='addVariant'>
            {product?.title}
        </main>
    )
}   

export default AddVariant  
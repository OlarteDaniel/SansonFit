import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { IoIosArrowDown } from "react-icons/io";

import {productsService,variantService} from '../services/services';

import ItemCount from '../components/widgets/ItemCount';

import UserContext from '../context/UserContext';
import ProductContext from '../context/ProductContext';

import imgDefault from '../assets/img/productsList/ImagenDefault.jpg'

import '../styles/pages/ProductDetails.css'


const ProductDetails = () => {

    const navigate = useNavigate();

    const {id} = useParams()
    const [product,setProduct] = useState(null);
    const [variants,setVariants] = useState(null);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [dropdownActive,setDropdownActive] = useState(false);

    const toggleDropdown = () => setDropdownActive(!dropdownActive);

    const {deleteProduct} = useContext(ProductContext);
    const {session} = useContext(UserContext)
    const role = session?.data?.payload.role

    const fetchProduct = async ()=>{
        try {
            const response = await productsService.getProductById(id);

            if(response && response.status === 200 ){
                setProduct(response.data.payload);
                const responseVariant = await variantService.getByProduct(id);
                setVariants(responseVariant.data.payload);

            }

        } catch (error) {
            setProduct(null)
            setVariants(null)
            console.error('Error al obtener el producto:', error)
        }
    }

    useEffect(()=>{
        fetchProduct();
    },[id])

    const imageClicked = (imgClicked) =>{
        setProduct(prevProduct => ({
            ...prevProduct,
            thumbnails: prevProduct.thumbnails.map((img,index) => ({
                ...img,
                main: imgClicked === index
            }))
        }))
    }

    const handleClickDelete = async () =>{
        await deleteProduct(id);
        navigate('/products')
    }

    const handleclickUpdate = () =>{
        navigate(`/product/modify/${id}`)
    }

    const quantityVariants = () =>{
        const variant = variants?.find(variant => variant.flavor ===selectedVariant); 
        return variant?.quantity || product?.stock
    }

    

    const imgPrimary = product?.thumbnails?.find?.(img => img.main) || imgDefault;

    const priceFormat = Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(product?.price);

    return (
        <main className="productDetails">

            <div className="container">
                <div className="section-img">
                    <div className="main-image">
                        <img src={imgPrimary.url} alt="" />
                        <p className={product?.globalStatus? 'active' : ''}>{product?.globalStatus? 'Habilitado' : 'Deshabilitado'}</p>
                    </div>
                    <div className="secondary-images">
                        {
                            product?.thumbnails?
                                product?.thumbnails.map((img,index) => (
                                    <div key={index} onClick={()=> imageClicked(index)} className="img">
                                        <img src={img.url}/>
                                    </div>
                                ))
                            :
                            <div className="img">
                                <img src={imgDefault}/>
                            </div>
                        }
                    </div>
                </div>
                <div className="section-details">

                    <div className="title">
                        <h2>{product?.title}</h2>
                    </div>

                    <div className="values">
                        <div className="price">
                            {priceFormat}
                        </div>

                        {
                            role === 'admin' && 
                            (
                                <div className="quantity">
                                    Stock: {product?.stock}
                                </div>
                            )
                        }
                        
                    </div>

                    {
                        variants?.length > 1 && (
                            <>
                                <p className="flavor-text">Sabor:</p>
                                <div className="variants">
                                    {variants.map((variant) => (
                                        <label key={variant._id} 
                                            className={`variant ${variant.quantity < 1 ? 'disabled' : ''}`}>
                                            <input
                                                type="radio"
                                                name="variant"
                                                disabled= {variant.quantity < 1}
                                                value={variant.flavor}
                                                onChange={() => setSelectedVariant(variant.flavor)}
                                            />
                                            {variant.flavor}
                                        </label>
                                    ))}
                                </div>
                            </>
                        )
                    }

                    <div className="description">
                        <div className="input-description" onClick={toggleDropdown}>
                            <p>Descripcion <IoIosArrowDown className={`arrowDown-icon ${dropdownActive? 'down':'up'}`}/></p>
                        </div>
                        <div className={`value-description ${dropdownActive? 'active' : ''}`}>
                            {product?.description}
                        </div>
                    </div>

                    <div className="buttons">
                        {
                            role === 'admin'?
                            <>

                                <button className='modify' onClick={handleclickUpdate}>Modificar</button>
                                <button className='delete' onClick={handleClickDelete}>Eliminar</button>

                            </>
                            :
                            <>
                                {
                                    role === 'user' && 
                                    (
                                        <ItemCount stock={quantityVariants()} initialValue={1} />
                                    )
                                }
                            </>
                        }
                    </div>

                </div>
            </div>
        </main>
    )
}

export default ProductDetails
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { IoIosArrowDown } from "react-icons/io";
import { RiDiscountPercentFill } from "react-icons/ri";

import {productsService,variantService} from '../services/services';

import ItemCount from '../components/widgets/ItemCount';

import UserContext from '../context/UserContext';
import ProductContext from '../context/ProductContext';
import CartContext from '../context/CartContext';

import imgDefault from '../assets/img/productsList/ImagenDefault.jpg'

import '../styles/pages/ProductDetails.css'

import { Toaster } from 'sonner'


const ProductDetails = () => {

    const navigate = useNavigate();

    const {id} = useParams()
    const [product,setProduct] = useState(null);
    const [variants,setVariants] = useState(null);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [dropdownActive,setDropdownActive] = useState(false);

    const toggleDropdown = () => setDropdownActive(!dropdownActive);

    const {deleteProduct} = useContext(ProductContext);
    const {session} = useContext(UserContext);
    const {addItem} = useContext(CartContext);

    const role = session?.data?.payload.role
    const fetchProduct = async ()=>{
        try {
            const response = await productsService.getProductById(id);

            if(response && response.status === 200 ){
                setProduct(response.data.payload);
                const responseVariant = await variantService.getByProduct(id);
                setVariants(responseVariant.data.payload);
                setSelectedVariant(responseVariant.data.payload.length > 0? responseVariant.data.payload[0]._id : null )
            }

        } catch (error) {
            setProduct(null)
            setVariants(null)
            setSelectedVariant(null)
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
        const variant = variants?.find(variant => variant._id ===selectedVariant); 
        return variant?.quantity || product?.stock
    }

    const discountActive = () => {
        if (!variants || variants.length === 0) return product?.discount || 0;
    
        let variant;
    
        if (selectedVariant) {
            variant = variants.find(v => v._id === selectedVariant);
        }
    
        // Si no hay variante seleccionada pero hay solo una, usar esa
        if (!variant && variants.length === 1) {
            variant = variants[0];
        }
    
        const productDiscount = product?.discount || 0;
        const variantDiscount = variant?.discount || 0;
    
        // Por ejemplo, sumar ambos descuentos

        return productDiscount + variantDiscount;
    }    

    const imgPrimary = product?.thumbnails?.find?.(img => img.main) || imgDefault;

    const price = product?.price;
    const priceFormat = Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(price);

    const discountedPrice = price - (price*(discountActive()/100));
    const discountedPriceFormat = Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(discountedPrice);

    const addCart = (count) =>{
        const variant = variants?.find(variant => variant._id ===selectedVariant)
        addItem(product,variant,count,imgDefault)
    }

    return (
        <main className="productDetails">

            <Toaster 
                theme='light'
                richColors
                closeButton
            />

            <div className="container">
                <div className="section-img">
                    <div className="main-image">
                        <img src={imgPrimary.url} alt="" />
                        {role === 'admin' && 
                            <p className={product?.globalStatus? 'active' : ''}>{product?.globalStatus? 'Habilitado' : 'Deshabilitado'}</p>
                        }
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
                            {discountActive()? 
                                <>
                                    <span className="old-price">{priceFormat}</span>
                                    <span className="new-price">{discountedPriceFormat}</span>
                                </>
                                :
                                <>{priceFormat}</>
                            }
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
                                {variants.map((variant) => {
                                    const hasProductDiscount = product?.discount > 0;
                                    const hasVariantDiscount = variant?.discount > 0;
                                    const totalDiscount = (hasProductDiscount ? product.discount : 0) + (hasVariantDiscount ? variant.discount : 0);

                                    return (
                                    <label
                                        key={variant._id}
                                        className={`variant ${variant.quantity < 1 ? 'disabled' : ''}`}
                                    >
                                        {/* Mostrar el ícono si al menos uno tiene descuento */}
                                        {(hasProductDiscount || hasVariantDiscount) && (
                                        <span className="discount-icon">
                                            {totalDiscount}
                                            <RiDiscountPercentFill />
                                        </span>
                                        )}

                                        <input
                                        type="radio"
                                        checked={variant._id === selectedVariant}
                                        name="variant"
                                        disabled={variant.quantity < 1}
                                        value={variant.flavor}
                                        onChange={() => setSelectedVariant(variant._id)}
                                        />
                                        {variant.flavor}
                                    </label>
                                    );
                                })}
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
                                        <ItemCount stock={quantityVariants()} initialValue={1} addCart={addCart}/>
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
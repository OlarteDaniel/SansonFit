import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { HiMagnifyingGlass } from "react-icons/hi2";

import UserContext from '../../context/UserContext';
import ProductContext from '../../context/ProductContext';

import { FaRegTrashAlt } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

import imgDefault from '../../assets/img/productsList/ImagenDefault.jpg'

import '../../styles/components/products/ProductCard.css'
import { variantService } from '../../services/services';

const ProductCard = ({id,title,price,discount,hasDiscount,status,thumbnails}) => {
    
    const [hasVariantDiscount, setHasVariantDiscount] = useState(false);
    const [variants, setVariants] = useState([]);

    useEffect(() => {
        const checkVariantDiscount = async () => {
            try {
                const res = await variantService.getByProduct(id);
                const variants = res.data?.payload || [];
                setVariants(variants);

                const anyVariantHasDiscount = variants.some(variant => variant.discount > 0);
                setHasVariantDiscount(anyVariantHasDiscount);
            } catch (error) {
                console.error('Error al obtener variantes:', error);
                setHasVariantDiscount(false);
            }
        };

        // Solo ejecuta si no hay descuento a nivel producto
        if (!hasDiscount) {
            checkVariantDiscount();
        }
    }, [id, hasDiscount]);

    // Función que devuelve el descuento activo
    const discountActive = () => {
        // Si hay variantes, buscar si la variante seleccionada tiene descuento
        let variant = null;

        if (variants.length === 1) {
            // Si solo hay una variante, la tomamos como seleccionada
            variant = variants[0];
        }

        const productDiscount = hasDiscount ? discount : 0;
        const variantDiscount = variant?.discount || 0;

        // Combina los descuentos o toma el mayor
        return productDiscount + variantDiscount;
    };

    const finalDiscount = discountActive();
    const finalPrice = price - (price * finalDiscount / 100);
    const finalPriceFormat = Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(finalPrice);

    const showDiscountBadge = hasDiscount || hasVariantDiscount;

    const {deleteProduct,activeVariant} = useContext(ProductContext);
    const {session} = useContext(UserContext);

    const navigate = useNavigate();
    
    const handleClickInformation = (event) =>{
        event.stopPropagation() // Evita que el evento se propague al padre
        navigate(`/product/detail/${id}`);
    }

    const handleClickDelete = async (event) => {
        event.stopPropagation(); 
        await deleteProduct(id)
    };

    const handleclickAddVariant = (event) => {
        event.stopPropagation(); 
        activeVariant(id)
    };

    const handleclickUpdate = (event) =>{
        event.stopPropagation();
        navigate(`/product/modify/${id}`)
    }

    const imgPrimary = thumbnails.find(img => img.main ===true)

    return (
        //Acabamos de remplazar un div por el link , en caso de fallar reemplazar el Link por el div //
        <div onClick={handleClickInformation} className='card'>  
            <div className="card-product">
                <div className="img">
                    <button className='button-glass'>
                        <HiMagnifyingGlass className='glass-icon'/>
                    </button>
                    {showDiscountBadge && (
                    <div className="discount-banner">Oferta</div>
                    )}
                    <img src={imgPrimary?.url || imgDefault} alt="" />
                    {
                        session && 
                            <div className="buttons">
                            {session.data.payload.role === 'user'? 
                                <button 
                                    className='button button-buys' //Antes este boton era el de compra pero decidimos utilizarlo como ver más 
                                >
                                    Ver más
                                </button>
                            :  
                                <>
                                    <button 
                                        className='button circle button-edit'
                                        onClick={handleclickUpdate}
                                    >
                                        <span className=' pencil-icon'><FaPencilAlt /></span>
                                    </button>

                                    <button 
                                        className='button circle button-delete'
                                        onClick={handleClickDelete}
                                    >
                                        <span className='trash-icon'><FaRegTrashAlt /></span>
                                    </button>

                                    <button
                                        className='button circle button-plus'
                                        onClick={handleclickAddVariant}
                                    >
                                        <span className='plus-icon'><FaPlus /></span>
                                    </button>
                                </>
                            }
                        </div>
                    }
                </div>
            </div>
            <div className="card-details">
                <div className="title">
                    <h3>{title}</h3>
                </div>
                <div className="price">
                    <p>{finalPriceFormat}</p>
                </div>
                {session?.data?.payload?.role==='admin' && 
                    (
                        <p className={`infoStatus ${status? 'enabled' : 'disabled'}`}>
                            {status ? 'Habilitado' : 'Deshabilitado'}
                        </p>
                    )
                }
            </div>
        </div>
    )
}

export default ProductCard
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';

import { HiMagnifyingGlass } from "react-icons/hi2";

import UserContext from '../../context/UserContext';
import ProductContext from '../../context/ProductContext';

import { FaRegTrashAlt } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

import imgDefault from '../../assets/img/productsList/ImagenDefault.jpg'

import '../../styles/components/products/ProductCard.css'

const ProductCard = ({id,title,price,status,thumbnails}) => {
    
    const {deleteProduct,activeVariant} = useContext(ProductContext);
    const {session} = useContext(UserContext);

    const navigate = useNavigate();

    const priceFormat = Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(price);

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

    const imgPrimary = thumbnails.find(img => img.main ===true)

    return (
        //Acabamos de remplazar un div por el link , en caso de fallar reemplazar el Link por el div //
        <div onClick={handleClickInformation} className='card'>  
            <div className="card-product">
                <div className="img">
                    <button className='button-glass'>
                        <HiMagnifyingGlass className='glass-icon'/>
                    </button>
                    <img src={imgPrimary?.url || imgDefault} alt="" />
                    {
                        session && 
                            <div className="buttons">
                            {session.data.payload.role === 'user'? 
                                <button className='button button-buys'>Comprar</button>
                            :  
                                <>
                                    <button 
                                        className='button circle button-edit'
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
                    <p>{priceFormat}</p>
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
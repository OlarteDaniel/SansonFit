import React, { useContext } from 'react'
import { Link } from 'react-router-dom';

import Creatina from '../../assets/img/productsList/Creatina-Start.png'
import { HiMagnifyingGlass } from "react-icons/hi2";

import UserContext from '../../context/UserContext';
import ProductContext from '../../context/ProductContext';

import { productsService } from '../../services/services';

import '../../styles/components/products/ProductCard.css'

const ProductCard = ({id,title,price}) => {
    
    const {deleteProduct} = useContext(ProductContext);
    const {session} = useContext(UserContext);

    const priceFormat = Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(price);

    return (
        //Acabamos de remplazar un div por el link , en caso de fallar reemplazar el Link por el div //
        <Link className='card'>  
            <div className="card-product">
                <div className="img">
                    <button className='button-glass'>
                        <HiMagnifyingGlass className='glass-icon'/>
                    </button>
                    <img src={Creatina} alt="" />
                    {
                        session && 
                            <div className="buttons">
                                {session.data.payload.role === 'user'? 
                                    <button className='button button-buys'>Comprar</button>
                                :  
                                    <>
                                        <button 
                                            className='button button-edit'
                                        >
                                                Editar
                                        </button>

                                        <button 
                                            className='button button-delete'
                                            onClick={() => deleteProduct(id)}
                                        >
                                                Eliminar
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
            </div>
        </Link>
    )
}

export default ProductCard
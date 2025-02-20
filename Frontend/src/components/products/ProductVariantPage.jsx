import React, { useContext } from 'react'

import { BsXLg } from "react-icons/bs";

import CreatinaStart from '../../assets/img/productsList/Creatina-Start.png'

import ProductContext from '../../context/ProductContext';

import '../../styles/components/products/ProductVariantPage.css'
const ProductVariantPage = () => {

    const {activeVariant} = useContext(ProductContext)

    return (
        <div className='variantForm'>
            <div className="section-one">
                <div className="header">
                    <div onClick={()=> activeVariant()} className="button-x">
                        <BsXLg className='icon-x'/>
                    </div>
                </div>
                <img src={CreatinaStart} alt="" />
            </div>
            <div className="section-two">
                
                <div className="title">
                    <h3>Agregar variantes</h3>
                </div>

                <div className="form">
                    <div className="inputbox">
                        <label>
                            Sabor
                        </label>
                        <input type="text" />
                    </div>

                    <div className="inputbox">
                        <label>
                            Cantidad
                        </label>
                        <input type="number"/>
                    </div>

                    <div className="buttons">
                        <button>Agregar</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ProductVariantPage
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'

import { BsXLg } from "react-icons/bs";

import ProductContext from '../../context/ProductContext';

import { variantService } from '../../services/services';

import imgDefault from '../../assets/img/productsList/ImagenDefault.jpg'

import '../../styles/components/products/ProductVariantPage.css'

const ProductVariantPage = () => {

    const {category,product,activeVariant} = useContext(ProductContext)
    const {register, handleSubmit, formState:{errors},reset} = useForm();

    const imgPrimary = product?.thumbnails.find(img => img.main ===true)

    const onSubmit = async (data) =>{
        const newVariant = {}
        
        if(category.type === 'apparel'){
            newVariant.size = data.size
            newVariant.color = data.color
        }else if(category.type === 'supplements'){
            try {
                // Verificar si el sabor ya existe
                const existsFlavor = await variantService.getByProductAndFlavor(product._id, data.flavor);
                
                if (existsFlavor.status === 200) {
                    // Si existe, actualizar la cantidad
                    const flavorUpdate = {
                        productId: product._id,
                        flavor: data.flavor,
                        quantity: Number(data.quantity) + Number(existsFlavor.data.payload.quantity),
                        newQuantity: data.quantity
                    };
                    await variantService.updateFlavor(existsFlavor.data.payload._id, flavorUpdate);
                    return;
                } else {
                    // Si no existe el sabor
                    newVariant.flavor = data.flavor;
                }
            } catch (error) {
                console.error('Error al verificar el sabor:', error);
            }
        }
        newVariant.quantity = data.quantity

        try {
            if (category.type === 'apparel') {
                console.log('En producción');
            } else if (category.type === 'supplements') {
                const result = await variantService.addFlavor(product._id, newVariant);
            }
        } catch (error) {
            console.error('Error al agregar la variante:', error);
            // Mostrar mensaje de error o realizar alguna acción
        }
        
    }

    return (
        <div className='variantForm'>
            <div className="section-one">
                <div className="header">
                    <h2 className='title-product' >{product?.title}</h2>
                    <div onClick={()=> {
                            reset();
                            activeVariant()}
                        }
                        className="button-x">
                            <BsXLg className='icon-x'/>
                    </div>
                </div>
                <img src={imgPrimary?.url || imgDefault} alt="" />
            </div>
            <div className="section-two">
                
                <div className="title">
                    <h3>Agregar variantes</h3>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="form">
                    
                    {category?.type === 'supplements'?
                        <div className="inputbox">
                            <label>
                                Sabor
                            </label>
                            <input 
                                className={`${errors.flavor?.type==='required' && 'border-red'}`}
                                type="text"
                                {...register('flavor',{required:true})}
                            />
                            {
                                errors.flavor?.type==='required' 
                            && 
                                <p className='error-message'>El campo es obligatorio</p>
                            }
                        </div>
                        :
                        <>
                            <div className="inputbox">
                                <label>
                                    Tamaño
                                </label>
                                <select
                                    className={`${errors.size?.type==='required' && 'border-red'}`}
                                    defaultValue=""
                                    {...register('size', { required: true })}
                                >
                                    <option value="" disabled hidden>Seleccione el tamaño</option>
                                    <option value="XS">XS</option>
                                    <option value="S">S</option>
                                    <option value="M">M</option>
                                    <option value="L">L</option>
                                    <option value="XL">XL</option>
                                    <option value="XXL">XXL</option>
                                </select>
                                {
                                errors.size?.type==='required' 
                                && 
                                    <p className='error-message'>El campo es obligatorio</p>
                                }
                            </div>

                            <div className="inputbox">
                                <label>
                                    Color
                                </label>
                                <input 
                                    className={`${errors.color?.type==='required' && 'border-red'}`}
                                    type="text"
                                    {...register('color',{required:true})}
                                />
                                {
                                errors.color?.type==='required' 
                                && 
                                    <p className='error-message'>El campo es obligatorio</p>
                                }
                            </div>
                        </>
                    }

                    <div className="inputbox">
                        <label>
                            Cantidad
                        </label>
                        <input 
                            className={`${errors.quantity?.type==='required' && 'border-red'}`}
                            type="number"
                            {...register('quantity',{required:true,min: 1})}
                        />
                        {
                        errors.quantity?.type==='required' 
                        && 
                            <p className='error-message'>El campo es obligatorio</p>
                        }
                        {
                            errors.quantity?.type==='min' 
                            && 
                            <p className='error-message'>El valor debe ser mayor a 0</p>
                        }
                    </div>
                    

                    <div className="buttons">
                        <button type='submit'>Agregar</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default ProductVariantPage
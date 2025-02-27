import React, {useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

import { useForm } from 'react-hook-form'
import useScrollLock from '../hooks/useScrollLock';

import {categoryService} from '../services/services';

import ProductContext from '../context/ProductContext';

import VariantSection from '../components/products/VariantSection';

import { Toaster } from 'sonner'

import '../styles/pages/RegisterProduct.css'


const RegisterProduct = () => {
    const [toggle] = useScrollLock();
    const [variant, setVariant] = useState(false);
    const [categories,setCategories] = useState([]);
    const [serverError, setServerError] = useState('');
    const {register, handleSubmit, formState:{errors},reset} = useForm();
    const {addProducts} = useContext(ProductContext);

    const onSubmit =  async (data) =>{
        setServerError('');

        const formData = new FormData();
        formData.append('title',data.title);
        formData.append('description',data.description);
        formData.append('price',data.price);
        formData.append('category',data.category);
        formData.append('globalStatus',data.status);
        if (data.thumbnails?.length) {
            for (const file of data.thumbnails) {
                formData.append('thumbnails', file);
            }
        }

        try {
            addProducts(formData);
            reset();

        } catch (error) {
            setServerError(`Ocurrió un problema con el servidor.`);
            console.error("Error al crear el producto:", error);
        }

    }

    const handleChange = ()=>{
        setVariant(!variant);
        toggle();
    }

    useEffect(()=>{

        const fetchCategories = async() =>{
            const result = await categoryService.getCategories();
            setCategories(result.data.payload);
        }

        fetchCategories();
        
    },[]);

    return (
        <main className='registerProduct'>

            <Toaster 
                theme='system'
                richColors
                closeButton
            />

            <div className="container">
                <h2 className='title'>Registrar Producto</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="form">

                    <div className="inputbox">
                        <label>Titulo</label>
                        <input 
                            className={`${errors.title?.type==='required' && 'border-red'}`}
                            type="text"
                            {...register('title',{ required: true })}
                        />
                        {
                            errors.title?.type==='required' 
                            && 
                            <p className='error-message'>El campo es obligatorio</p>
                        }
                    </div>

                    <div className="inputbox">
                        <label>Descripcion</label>
                        <input 
                            className={`${errors.description?.type==='required' && 'border-red'}`}
                            type="text"
                            {...register('description',{ required: true })}
                        />
                        {
                            errors.description?.type==='required' 
                            && 
                            <p className='error-message'>El campo es obligatorio</p>
                        }
                    </div>

                    <div className="inputbox">
                        <label>Precio</label>
                        <input 
                            className={`${errors.price?.type==='required' && 'border-red'}`}
                            type="number"
                            {...register('price',{ required: true })}
                        />
                        {
                            errors.price?.type==='required' 
                            && 
                            <p className='error-message'>El campo es obligatorio</p>
                        }
                    </div>

                    <div className="inputbox">
                        <label>Categoria</label>
                        <select
                            className={errors.category ? 'border-red' : ''}
                            defaultValue=""
                            {...register('category', { required: true })}
                        >
                            <option value="" disabled hidden>Seleccione la categoria</option>

                            {categories.map((category) => (
                                <option key={category._id} value={category._id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>


                        {
                            errors.category?.type==='required' 
                            && 
                            <p className='error-message'>El campo es obligatorio</p>
                        }
                    </div>

                    <div className="inputbox">
                        <label>Estado</label>
                        <select
                            defaultValue=''
                            {...register('status')}   
                        >
                            <option value={true}>Habilitado</option>
                            <option value={false}>Deshabilitado</option>
                        </select>
                    </div>

                    <div className="inputbox">
                        <input 
                            type="file" 
                            id="uploadFile" 
                            {...register('thumbnails')}
                            multiple
                            />
                        <label htmlFor="uploadFile" className="file-label">Seleccionar archivo</label>
                    </div>

                    <div className="btns">
                        <button type="submit">Agregar</button>
                        <button type="reset">Resetear</button>
                    </div>
                    {serverError && <p className="error-message">{serverError}</p>}
                </form>
                <p className='text-category'>
                    Presione aqui para
                    <span 
                        onClick={(()=> handleChange())}
                        className="register-category">
                            Registrar categorias
                    </span>
                </p>
            </div>

            <section className={`variantSectionComponent ${variant? 'activate': ''}`}>
                <VariantSection handleChange={handleChange}/>
            </section>        

        </main>
    )
}

export default RegisterProduct
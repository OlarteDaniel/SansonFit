import React, {useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import {productsService,categoryService} from '../services/services';

import ProductContext from '../context/ProductContext';

import '../styles/pages/RegisterProduct.css'


const RegisterProduct = () => {
    const [categories,setCategories] = useState([]);
    const [serverError, setServerError] = useState('');
    const {register, handleSubmit, formState:{errors}} = useForm();
    const {addProducts} = useContext(ProductContext);

    const onSubmit =  async (data) =>{
        setServerError('');

        const formData = new FormData();
        formData.append('title',data.title);
        formData.append('description',data.description);
        formData.append('code',data.code);
        formData.append('price',data.price);
        formData.append('category',data.category);
        if (data.thumbnails?.length) {
            for (const file of data.thumbnails) {
                formData.append('thumbnails', file);
            }
        }

        try {
            
            addProducts(formData);

        } catch (error) {
            setServerError(`Ocurrió un problema con el servidor.`);
            console.error("Error al crear el producto:", error);
        }

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
                        <label>Codigo</label>
                        <input 
                            className={`${errors.code?.type==='required' && 'border-red'}`}
                            type="text"
                            {...register('code',{ required: true })}
                        />
                        {
                            errors.code?.type==='required' 
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
            </div>
        </main>
    )
}

export default RegisterProduct
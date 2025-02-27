import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import {categoryService} from '../../services/services'

import { BsXLg } from "react-icons/bs";

import '../../styles/components/products/VariantSection.css'

const VariantSection = ({handleChange}) => {

    const [serverError, setServerError] = useState('');
    const {register, handleSubmit, formState:{errors},reset} = useForm();

    const onSubmit = async (data) =>{

        setServerError("");
        try {
            const responseCategory = await categoryService.getCategoryByTypeAndName(data.type,data.name);
            console.log(responseCategory)
            if (responseCategory && responseCategory.status === 200) {
                setServerError('Ya existe esta categoría');
                return;
            }

            const newCategory = {
                type: data.type,
                name: data.name
            };

            const createCategory = await categoryService.createCategory(newCategory);
            console.log(categoryService)
            if (createCategory && createCategory.status === 201) {
                handleChange();
            }

        } catch (error) {
            console.error(error.response ? error.response.data : error);
            setServerError("Ocurrió un error inesperado");
        }

    }

    return (
        <div className='variantSection'>
            <div className="header">
                <h3>Agregar categoria</h3>
                <div
                    onClick={() => {
                        handleChange()
                        reset();
                    }} 
                    className="button-x">
                    <BsXLg className='icon-x'/>
                </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='form'>
                <div className="inputbox">
                    <label>Nombre</label>
                    <input
                        className={`${errors.name?.type==='required' && 'border-red'}`}
                        {...register('name',{required:true})} 
                        type="text"/>
                    {
                        errors.name?.type==='required' 
                    && 
                        <p className='error-message'>El campo es obligatorio</p>
                    }
                </div>
                <div className="inputbox">
                    <label>tipo</label>
                    <select
                        className={`${errors.type?.type==='required' && 'border-red'}`}
                        {...register('type',{required:true})}
                        defaultValue="">    
                        
                            <option value="" disabled hidden>Seleccione el tipo de producto</option>
                            <option value="supplements">Suplemento</option>
                            <option value="apparel">Prenda</option>
                    </select>
                    {
                        errors.type?.type==='required' 
                    && 
                        <p className='error-message'>El campo es obligatorio</p>
                    }
                </div>
                <div className="buttons">
                    <button type='submit'>Agregar</button>
                </div>
                {serverError && <p className="error-message">{serverError}</p>}
            </form>
        </div>
    )
}

export default VariantSection
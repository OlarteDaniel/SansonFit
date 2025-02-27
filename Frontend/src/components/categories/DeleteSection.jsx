import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import {categoryService} from '../../services/services'

import { BsXLg } from "react-icons/bs";

import '../../styles/components/categories/DeleteSection.css'

const DeleteSection = ({handleChange,categories,deleteCategory}) => {

    const [serverError, setServerError] = useState('');
    const {register, handleSubmit, formState:{errors},reset} = useForm();

    const onSubmit = async (data) =>{
        try {
            const response = await categoryService.deleteCategory(data.category)
            if(response && response.status === 200){
                deleteCategory(data.category);
                handleChange('delete')
                reset()
            }
        } catch (error) {
            console.error(error.response ? error.response.data : error);
            setServerError("Ocurrió un error inesperado");
        }
    }

    return (
        <div className='deleteSection'>

            <div className="header">
                <h3>Eliminar categoria</h3>
                <div
                    onClick={() => {
                        handleChange('delete')
                        reset();
                    }} 
                    className="button-x">
                    <BsXLg className='icon-x'/>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className='form'>
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

                <div className="buttons">
                    <button type='submit'>Eliminar</button>
                </div>

                {serverError && <p className="error-message">{serverError}</p>}
            </form>
        </div>
    )
}

export default DeleteSection
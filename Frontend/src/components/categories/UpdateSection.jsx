import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import {categoryService} from '../../services/services'

import { BsXLg } from "react-icons/bs";

import '../../styles/components/categories/UpdateSection.css'

const UpdateSection = ({handleChange,categories,editCategory}) => {

    const [serverError, setServerError] = useState('');
    const {register, handleSubmit, formState:{errors},reset} = useForm();

    const onSubmit = async (data) =>{
        try {
            const id = data.category;
            const newName = {name:data.name};
            const response = await categoryService.updateCategory(id,newName)
            if(response && response.status=== 200){
                editCategory(id,data.name)
                handleChange('edit')
                reset()
            }
        } catch (error) {
            
        }
    }

    return (  
        <div className='updateSection'>
            <div className="header">
                <h3>Modificar categoria</h3>
                <div
                    onClick={() => {
                        handleChange('edit')
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

                <div className="inputbox">
                    <label>Nuevo nombre</label>
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

                <div className="buttons">
                    <button type='submit'>Modificar</button>
                </div>

                {serverError && <p className="error-message">{serverError}</p>}
            </form>

        </div>
    ) 
}

export default UpdateSection    
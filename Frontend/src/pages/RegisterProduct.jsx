import React, {useContext, useEffect, useState } from 'react'

import { useForm } from 'react-hook-form'
import useScrollLock from '../hooks/useScrollLock';

import {categoryService} from '../services/services';

import ProductContext from '../context/ProductContext';

import VariantSection from '../components/categories/VariantSection';
import DeleteSection from '../components/categories/DeleteSection';
import UpdateSection from '../components/categories/UpdateSection';

import { Toaster } from 'sonner'

import '../styles/pages/RegisterProduct.css'


const RegisterProduct = () => {
    const [toggle] = useScrollLock();
    const [categories,setCategories] = useState([]);
    const [categorySections,setCategorySections] = useState({
        add:false,
        delete:false,
        edit:false
    });
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [serverError, setServerError] = useState('');
    const {register, handleSubmit, formState:{errors},reset} = useForm();
    const {addProducts} = useContext(ProductContext);

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files).map(file => file.name);
        const count = files.length;
        setSelectedFiles(files);
    };

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

    const addCategory = (category) => {
        categories.push(category);
    }

    const deleteCategory = (id) =>{
        setCategories(categories.filter(cat => cat._id !== id))
    }

    const editCategory = (id,newCategory)=>{
        const editCategory = categories.map(cat =>{
            if(cat._id === id){
                return {
                    ...cat,
                    name:newCategory
                }
            }
            return cat
        })
        setCategories(editCategory);
    }

    const handleChange = (section)=>{
        setCategorySections( prev => ({
            ...prev,
            [section]: !prev[section]
        }))
        toggle();
    }

    useEffect(()=>{

        const fetchCategories = async() =>{
            const result = await categoryService.getCategories();
            // Esta condicion permite que solo se actualice categories cuando
            // el valor almacenado en el estado "categories" sea distinto del 
            // valor obtenido  en "result". Esto significa que en result
            // se agrego o elimino una categoria
            if (JSON.stringify(categories) !== JSON.stringify(result.data.payload)) {
                setCategories(result.data.payload);
            }
        }
        fetchCategories();
    },[categories]);

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
                        <label>Descripcion</label>
                        <textarea 
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
                        <input 
                            type="file" 
                            id="uploadFile" 
                            {...register('thumbnails', {
                                onChange: (e) => handleFileChange(e) // Captura los archivos manualmente
                            })}
                            multiple
                            />
                        <label htmlFor="uploadFile" className="file-label">Seleccionar archivo</label>
                        {selectedFiles.length > 0 && (
                            <div className="file-names">
                                {selectedFiles.map((file, index) => (
                                    <span key={index} className="file-name">{file}</span>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="btns">
                        <button type="submit">Agregar</button>
                        <button type="reset">Resetear</button>
                    </div>
                    {serverError && <p className="error-message">{serverError}</p>}
                </form>
                
                <p className="text-category">
                    Presione aquí para
                    {["add", "edit", "delete"].map((action, index, array) => (
                        <React.Fragment key={action}>
                            <span 
                                onClick={() => handleChange(action)}
                                className={`${action}-category activable`}
                            >
                                {action === "add" ? "Registrar" : action === "edit" ? "Modificar" : "Eliminar"} categorías
                            </span>
                            {index < array.length - 1 && (index === array.length - 2 ? " o " : ", ")}
                        </React.Fragment>
                    ))}
                </p>

            </div>

            <section className={`variantSectionComponent ${categorySections.add? 'activate': ''}`}>
                <VariantSection handleChange={handleChange} addCategory={addCategory}/>
            </section>        

            <section className={`deleteSectionComponent ${categorySections.delete? 'activate': ''}`}>
                <DeleteSection handleChange={handleChange} categories={categories} deleteCategory={deleteCategory}/>
            </section>

            <section className={`updateSectionComponent ${categorySections.edit? 'activate': ''}`}>
                <UpdateSection handleChange={handleChange} categories={categories} editCategory={editCategory}/>
            </section>

        </main>
    )
}

export default RegisterProduct
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { categoryService, productsService} from '../../services/services';
import '../../styles/components/formsUpdates/DefaultForm.css';

const DefaultForm = () => {
    const { id } = useParams();
    const [categories, setCategories] = useState([]);
    const [product, setProduct] = useState(null);
    // Configuración del formulario con react-hook-form
    const { register, handleSubmit, formState: { errors }, reset, watch, } = useForm();

    const watchPrice = watch("price", product?.price || 0);
    const watchDiscount = watch("discount", product?.discount || 0);

    const calculatedPrice = (watchPrice - (watchPrice * (watchDiscount / 100))).toFixed(2);

    const onSubmit = async (data) => {
        console.log(data);
    };
    // Función para obtener el producto
    const fetchProduct = async () => {
        try {
            const response = await productsService.getProductById(id);
            if (response && response.status === 200) {
                setProduct(response.data.payload);
            }
        } catch (error) {
            setProduct(null);
            console.error('Error al obtener el producto:', error);
        }
    };

    // Función para obtener las categorías
    const fetchCategories = async () => {
        try {
            const result = await categoryService.getCategories();
            setCategories(result.data.payload);
        } catch (error) {
            console.error('Error al obtener categorías:', error);
        }
    };

    // Obtener las categorías y el producto cuando se monta el componente
    useEffect(() => {
        fetchCategories();
        fetchProduct();
    }, [id]);

    // Resetear el formulario cuando `product` cambie
    useEffect(() => {
        if (product) {
            reset(product);
        }
    }, [product, reset]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='DefaultForm'>
            <div className="inputbox">
                <label>Título</label>
                <input
                    className={`${errors.title?.type === 'required' && 'border-red'}`}
                    type="text"
                    {...register('title', { required: true })}
                />
                {errors.title?.type === 'required' && <p className='error-message'>El campo es obligatorio</p>}
            </div>

            <div className="inputbox">
                <label>Precio</label>
                <input
                    className={`${errors.price?.type === 'required' && 'border-red'}`}
                    type="number"
                    {...register('price', { required: true })}
                    defaultValue={product?.price}
                />
                {errors.price?.type === 'required' && <p className='error-message'>El campo es obligatorio</p>}
            </div>

            <div className="inputbox">
                <label>Descuento (%)</label>
                <input
                    className={`${errors.discount?.type === 'required' && 'border-red'}`}
                    type="number"
                    {...register('discount', { required: true })}
                    defaultValue={product?.discount}
                />
                {errors.discount?.type === 'required' && <p className='error-message'>El campo es obligatorio</p>}
                <p className='price-discount'>Precio final: ${calculatedPrice}</p>
            </div>

            <div className="inputbox">
                <label>Categoría</label>
                <select className={errors.category ? 'border-red' : ''} {...register('category', { required: true })}>
                    <option value="" disabled hidden>Seleccione la categoría</option>
                    {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                {errors.category?.type === 'required' && <p className='error-message'>El campo es obligatorio</p>}
            </div>

            <div className="inputbox">
                <label>Estado</label>
                <select {...register('globalStatus')}>
                    <option value="true">Habilitado</option>
                    <option value="false">Deshabilitado</option>
                </select>
            </div>

            <div className="inputbox">
                <label>Descripción</label>
                <textarea
                    className={`${errors.description?.type === 'required' && 'border-red'}`}
                    {...register('description', { required: true })}
                />
                {errors.description?.type === 'required' && <p className='error-message'>El campo es obligatorio</p>}
            </div>

            <div className="btns">
                <button type="submit">Modificar</button>
            </div>
        </form>
    );
};

export default DefaultForm;

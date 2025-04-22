import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { categoryService, productsService, variantService } from '../../services/services';

import '../../styles/components/formsUpdates/VariantsForm.css';
import { useParams } from 'react-router-dom';

import { toast } from 'sonner'

const VariantsForm = () => {
  const { id } = useParams();
  const { register, handleSubmit ,reset} = useForm();

  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState(null);
  const [variants, setVariants] = useState([]);
  const [variantSelected,setVariantSelected] = useState(null);
  // Obtiene el producto
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productsService.getProductById(id);
        if (response?.status === 200) {
          setProduct(response.data.payload);
        }
      } catch (error) {
        setProduct(null);
        console.error('Error al obtener el producto:', error);
      }
    };

    fetchProduct();
  }, [id]);

  // Obtiene la categoría cuando el producto está cargado
  useEffect(() => {
    if (!product?.category) return;

    const fetchCategoriesById = async () => {
      try {
        const result = await categoryService.getCategoryById(product.category);
        setCategory(result?.data?.payload);
      } catch (error) {
        console.error('Error al obtener categorías:', error);
        setCategory(null);
      }
    };

    fetchCategoriesById();
  }, [product]);

  // Obtiene las variantes cuando la categoría está disponible
  useEffect(() => {
    if (!category?.type) return;

    const fetchVariantProductById = async () => {
      try {
        const response = await variantService.getByProduct(id);
        if (response?.status === 200) {
          setVariants(response.data.payload);
        }
      } catch (error) {
        console.error('Error al obtener las variantes:', error);
        setVariants([]);
      }
    };

    if (category.type === 'supplements') {
      fetchVariantProductById();
    }
  }, [category, id]);

  const handleVariantChange = (e) =>{
    const variant = variants.find((variant) => variant._id === e.target.value)
    setVariantSelected(variant)
    reset(variant)
  }

  const onSubmit = async (data) =>{
    const updateFlavor = {
      productId: data.productId,
      flavor:data.flavor,
      quantity:Number(data.quantity),
      discount:Number(data.discount),
      status:data.status
    }

    try {
      await toast.promise(
        variantService.updateFlavor(data.variants,updateFlavor),
          {
              loading: "Actualizando Sabor...",
              success: (() =>{
                  return 'Sabor actualizado'
              }),
              error: "Error al actualizar el producto",
          }
      );
    } catch (error) {
      toast.error("No se pudo actualizar el producto");
    }
  }


  return variants.length > 0 ? (
    <form onSubmit={handleSubmit(onSubmit)} className="VariantsForm">
      <div className="inputbox">
        <label>Variantes</label>
        <select defaultValue="" {...register('variants', {
          onChange: (e) => handleVariantChange(e)         
        })}>
          <option value="" disabled hidden>
            Seleccione la variante
          </option>

          {variants.map((variant) => (
            <option key={variant._id} value={variant._id}>
              {variant.flavor}
            </option>
          ))}
        </select>
      </div>

      {
        category?.type === 'supplements' ?
          <div className={`inputbox ${!variantSelected? 'disable' : ''}`}>
            <label>Sabor</label>
            <input
              disabled={!variantSelected}
              {...register('flavor', { required: true })}
              type="text" 
            />
          </div>
        :
          <>
            <div className={`inputbox ${!variantSelected? 'disable' : ''}`}>
              <label>Tamaño</label>
              <select disabled={!variantSelected}>
                <option value="" disabled hidden>Seleccione el tamaño</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
              </select>
            </div>

            <div className={`inputbox ${!variantSelected? 'disable' : ''}`}>
              <label>Color</label>
              <input disabled={!variantSelected} type="text" />
            </div>
          </>
      }

      <div className={`inputbox ${!variantSelected? 'disable' : ''}`}>
        <label>Cantidad</label>
        <input 
          disabled={!variantSelected}
          type="text" 
          {...register('quantity', { required: true })}
        />
      </div>

      <div className={`inputbox ${!variantSelected? 'disable' : ''}`}>
        <label>Descuento</label>
        <input 
          disabled={!variantSelected}
          type="number" 
          {...register('discount', { required: true })}
        />
      </div>

      <div className={`inputbox ${!variantSelected? 'disable' : ''}`}>
          <label>Estado</label>
          <select disabled={!variantSelected} {...register('status')}>
              <option value="true">Habilitado</option>
              <option value="false">Deshabilitado</option>
          </select>
      </div>

      <div className={`btns ${!variantSelected? 'disable' : ''}`}>
        <button disabled={!variantSelected} type="submit">Modificar</button>
      </div>

    </form>
  ) : (
    <p>Este producto no tiene variantes</p>
  );
};

export default VariantsForm;

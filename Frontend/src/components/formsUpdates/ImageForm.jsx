import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import {productsService, imagesService} from '../../services/services';

import ProductContext from '../../context/ProductContext';

import imgDefault from '../../assets/img/productsList/ImagenDefault.jpg'

import { LuScanEye } from "react-icons/lu";
import { LuEye } from "react-icons/lu";
import { FaRegTrashAlt } from "react-icons/fa";

import { toast } from 'sonner'

import '../../styles/components/formsUpdates/ImageForm.css'

const ImageForm = () => {

  const { id } = useParams();
  const [product,setProduct] = useState(null);
  const {register, handleSubmit} = useForm();
  const [selectedFiles, setSelectedFiles] = useState([]);

  const {fetchProducts} = useContext(ProductContext);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files).map(file => file.name);
    const length = imgs.length + files.length;

    if(length > 3){
      toast.error("No Puede haber mas de 3 imagenes por producto.");
      return;
    }

    setSelectedFiles(files);
  };

  const fetchProductById = async() =>{
    try {
      const response = await productsService.getProductById(id);
      if (response && response.status === 200) {
        setProduct(response.data.payload);
      }
    } catch (error) {
      setProduct(null);
      console.error('Error al obtener el producto:', error);
    }
  }

  const isValid = () =>{
    const length = product?.thumbnails.length;
    if(length >= 3){
      return true
    }

    return false
  }

  useEffect(()=>{
    fetchProductById();
  },[id])

  const imageClicked = (imgClicked) =>{
    setProduct(prevProduct => ({
      ...prevProduct,
      thumbnails: prevProduct.thumbnails.map((img,index) => ({
        ...img,
        falseMain: index === imgClicked
      }))
    }))
  }

  const handleFileMainChange = async () => {
    const indexImages = imgs.findIndex(img => img.falseMain === true);
    const newImgs = imgs.map((img,index) => {
      if(index === indexImages){
        return {url:img.url,main:true,fileId:img.fileId };
      }
      return {url:img.url,main:false,fileId:img.fileId}
    })

    if (!newImgs ) {
      toast.error("No hay imagen.");
      return;
    }
    
    const newThumbnails = {thumbnails:newImgs}

    try {
      await toast.promise( 
        imagesService.updateMainImage(id,newThumbnails),
          {
              loading:'Cambiando Imagen...',
              success: async () =>{
                await fetchProducts()

                setProduct(prev => ({
                  ...prev,
                  thumbnails: newImgs
                }));

                return "Se ha modificado la imagen principal"
              },
              error:'Error al modificar la imagen principal',
          }
      );
  } catch (error) {
      console.error("Error al cambiar la imagen principal:", error);
      toast.error("No se pudo cambiar la imagen principal.");
  }
  };

  const deleteImage = async () =>{
    if (!imgPrimary || !imgPrimary.fileId) {
      toast.error("No hay imagen para eliminar.");
      return;
    }

    try {
      await toast.promise( 
        imagesService.deleteImage(id,imgPrimary.fileId),
          {
              loading:'Borrando Imagen...',
              success: async () =>{

                const newFiles = imgs.filter(file => file.fileId !== imgPrimary.fileId);

                if (newFiles.length > 0) {
                    newFiles[0].falseMain = true;
                }

                setProduct(prev => ({
                  ...prev,
                  thumbnails: newFiles
                }));

                await fetchProducts();
                return "Se ha eliminado la imagen"
              },
              error:'Error al eliminar la imagen',
          }
      );
    } catch (error) {
        console.error("Error al eliminar la imagen:", error);
        toast.error("No se pudo eliminar la imagen.");
    }
  }

  const addImage = async (data) =>{
    const formData = new FormData();
    if (data.thumbnails?.length) {
      for (const file of data.thumbnails) {
        formData.append('thumbnails', file);
      }
    }
    try {
      await toast.promise( 
        imagesService.addImage(id,formData),
          {
              loading:'Subiendo Imagen...',
              success: async () => {
                await fetchProductById();
                setSelectedFiles([])
                return 'Imagen Subida correctamente'
              },
              error:'Error al Subir la imagen',
          }
      );
      
    } catch (error) {
      console.error("Error al cargar la imagen:", error);
      toast.error("No se pudo cargar la imagen.");
    }

  }

  const imgs = product?.thumbnails;
  const imgPrimary = imgs?.find(img => 
    img.falseMain === true || (!("falseMain" in img) && img.main === true)
  ) || imgDefault;


  return (
    <form onSubmit={handleSubmit(addImage)} className='ImageForm'>
      <div className="images">
        <div className="imgPrimary">
          <img src={imgPrimary?.url || imgDefault} />
          {
          imgPrimary.main !== true?
            <div onClick={handleFileMainChange} className='button-icon'>
              <LuEye  className='eye-icon'/>
            </div>
          :
            <div className="button-focusedEye">
              <LuScanEye  className='focusedEye-icon'/> 
            </div>
          }
          
            
          <div onClick={deleteImage} className='button'>
            <span className='trash-icon'><FaRegTrashAlt /></span>
          </div>
          
        </div>
        <div className="imgSecondary">
          {
            imgs?
              imgs.map((img,index) => (
                <div key={index} onClick={()=> imageClicked(index)} className="img">
                  <img src={img.url}/>
                  {
                    img.main === true &&
                      <LuScanEye  className='focusedEye-icon'/> 
                  }
                </div>
              ))
            :
              <div className="img">
                <img src={imgDefault}/>
              </div>
          }
        </div>
        {
          isValid() &&
            <p className='clarification'>Solo puede haber 3 imagenes</p>
        }
      </div>

      <div className="addImages">

        <div className={`inputbox ${isValid()? 'disable' : ''}`}>
          <input 
              type="file" 
              id="uploadFile" 
              multiple
              disabled={isValid()}
              {...register("thumbnails", {
                onChange: (e) => handleFileChange(e) // Captura los archivos manualmente
              })} // Deja que react-hook-form maneje el input
              
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
      </div>

      <div className="btns">
          <button 
            className={isValid()? 'disable' : ''}
            disabled={isValid()}
            type="submit"
          >Cargar archivo</button>
      </div>
    </form>
  )
}

export default ImageForm
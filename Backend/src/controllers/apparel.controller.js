import {productService,categoryService,apparelService} from '../service/service.js'
import cloudinary from '../utils/cloudinary.js';
import {unlink, promises as fsPromises} from 'fs'

const createApparel = async(req,res) =>{
    const {title,description,code,price,stock,category, size, material} = req.body;
    const thumbnails = [];

    const resultCategory = await categoryService.getCategoryById(category);
    if(!resultCategory){
        return res.sendBadRequest('Category not found');
    }

    if(!title || !description || !code || !price || !category  || !size || !material){
        return res.sendBadRequest('Information missing');
    }

    const resultCode = await productService.getProductByCode(code);
    if(resultCode){
        return res.sendBadRequest('The code cannot be repeated');
    }

    const folder = `Sanson Fit/${resultCategory.type}/${resultCategory.name}`;

    try {
        for(let i = 0; i < req.files.length; i++){
            const uploadedImage = await cloudinary.uploader
                .upload(req.files[i].path,{
                    public_id:`${code}-image-${i}`,
                    folder:folder
                });
            thumbnails.push({
                mimeType: req.files[i].mimeType,
                url: uploadedImage.secure_url,
                main: i == 0
            });
            await fsPromises.unlink(req.files[i].path);
            req.logger.info('File is deleted')
        }
    } catch (error) {
        return res.sendBadRequest('Failed to upload images to Cloudinary');
    }

    const newApparel = {
        title,
        description,
        code,
        price,
        stock,
        category,
        size,
        material,
        thumbnails
    }

    const result = await apparelService.createApparel(newApparel);

    if(!result){
        return res.sendBadRequest('Could not create product');
    }

    return res.sendSuccess('Product created');
}

const updateApparel = async(req,res) =>{
    const pid = req.params.id;
    const {title,description,price,discount,status,stock,category,size,material} = req.body;

    // Verificamos que el producto se encuentre en la BD
    const product = await productService.getProductsById(pid);
    if(!product){
        return res.sendNotFound('Product not found');
    }

    // Creamos un objeto que reflejara la actualizacion del producto
    let updateFields = {}

    // Aca detectamos si vamos a modificar en la 1ra seccion o 2da
    if(discount !== undefined || status !== undefined){

        if(discount !== undefined) updateFields.discount = discount

        if(status !== undefined) updateFields.status = status


    }else{
        
        if(!title || !description || !price || !category || !size || !material){
            return res.sendBadRequest('Information missing');
        }
    
        updateFields = {
            title,
            description,
            price,
            stock,
            category,
            size,
            material
        }

    }

    const result = await apparelService.updateApparel(pid,updateFields);
    
    if(!result){
        return res.sendBadRequest('Could not update product');
    }

    res.sendSuccess('Updated product')
}

export default {
    createApparel,
    updateApparel
}
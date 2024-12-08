import {productService,categoryService,supplementService} from '../service/service.js'
import cloudinary from '../utils/cloudinary.js';
import {unlink, promises as fsPromises} from 'fs'

const getAllByFlavor = async(req,res) =>{
    const flavor = req.params.flavor;

    const products = await supplementService.getByFlavor(flavor);

    if(!products){
        res.sendNotFound('flavor not found');
    }

    return res.sendSuccessWithPayload(products);
}

const createSupplement = async(req,res) =>{
    const {title,description,code,price,stock,category, flavor, weight} = req.body;
    const thumbnails = [];

    const resultCategory = await categoryService.getCategoryById(category);
    if(!resultCategory){
        return res.sendBadRequest('Category not found');
    }

    if(!title || !description || !code || !price || !category  || !flavor || !weight){
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

    const newSupplement = {
        title,
        description,
        code,
        price,
        stock,
        category,
        flavor,
        weight,
        thumbnails
    }

    const result = await supplementService.createSupplement(newSupplement);

    if(!result){
        return res.sendBadRequest('Could not create product');
    }

    return res.sendSuccess('Product created');
}

const updateSuppllement = async(req,res) =>{
    const pid = req.params.id;
    const {title,description,price,discount,status,stock,category,flavor,weight} = req.body;

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
        
        if(!title || !description || !price || !category || !flavor || !weight){
            return res.sendBadRequest('Information missing');
        }
    
        updateFields = {
            title,
            description,
            price,
            stock,
            category,
            flavor,
            weight
        }

    }

    const result = await supplementService.updateSupplement(pid,updateFields);
    
    if(!result){
        return res.sendBadRequest('Could not update product');
    }

    res.sendSuccess('Updated product')
}

export default {
    getAllByFlavor,
    createSupplement,
    updateSuppllement
}
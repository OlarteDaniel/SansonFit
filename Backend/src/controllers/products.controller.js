import {productService,categoryService} from '../service/service.js'
import cloudinary from '../utils/cloudinary.js';
import {unlink, promises as fsPromises} from 'fs'


const getAll = async(req,res) =>{
    
    const products = await productService.getProducts();


    if(products.length === 0){
        return res.sendNotFound('There are no registered products');
    }

    return res.sendSuccessWithPayload(products);
}

const getOne = async(req,res) =>{
    const pid = req.params.id;

    const product = await productService.getProductsById(pid);

    if(!product){
        res.sendNotFound('Product not found');
    }

    return res.sendSuccessWithPayload(product);
}

const create = async(req,res) =>{
    const {title,description,price,stock,category} = req.body;
    const thumbnails = [];

    const resultCategory = await categoryService.getCategoryById(category);

    if(!title || !description || !price || !category){
        return res.sendBadRequest('Information missing');
    }

    try {
        for(let i = 0; i < req.files.length; i++){
            const uploadedImage = await cloudinary.uploader
                .upload(req.files[i].path,{
                    public_id:`${title}-image-${i}`,
                    folder:`Sanson Fit/${resultCategory.name}`
                });
            thumbnails.push({
                mimeType: req.files[i].mimeType,
                url: uploadedImage.secure_url,
                main: i == 0
            });
            await fsPromises.unlink(req.files[i].path);
            console.log('File is deleted')
        }
    } catch (error) {
        return res.sendBadRequest('Failed to upload images to Cloudinary');
    }

    const newProduct = {
        title,
        description,
        price,
        stock,
        category,
        thumbnails
    }

    const result = await productService.createProduct(newProduct);

    if(!result){
        return res.sendBadRequest('Could not create product');
    }

    return res.sendSuccess('Product created');
}

const update = async(req,res) =>{
    const pid = req.params.id;
    const {title,description,price,discount,status,stock,category} = req.body;

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
        
        if(!title || !description || !price || !category){
            return res.sendBadRequest('Information missing');
        }
    
        updateFields = {
            title,
            description,
            price,
            stock,
            category
        }

    }

    const result = await productService.updateProduct(pid,updateFields);
    
    if(!result){
        return res.sendBadRequest('Could not update product');
    }

    res.sendSuccess('Updated product')
}

const eliminate = async(req,res)=>{
    const pid = req.params.id;

    const product = await productService.getProductsById(pid);
    if(!product){
        return res.sendNotFound('Product not found');
    }

    const category = await categoryService.getCategoryById(product.category);
    if(!category){
        return res.sendNotFound('Category not found');
    }


    const publicId = `Sanson Fit/${category.name}/${product.title}-image`
    
    try {

        for(let i = 0; i < product.thumbnails.length; i++){
            const cloudinaryResponse = await cloudinary.uploader.destroy(`${publicId}-${i}`);
            if (cloudinaryResponse.result !== 'ok') {
                return res.sendBadRequest('Failed to delete image from Cloudinary');
            }
        }

        const result = await productService.deleteProduct(pid);

        if(!result){
            return res.sendBadRequest('Could not delete product');
        }

        res.sendSuccess('Deleted product')

    } catch (error) {
        console.log(error)
    }
};

export default{
    getAll,
    getOne,
    create,
    update,
    eliminate
}
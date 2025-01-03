import mongoose from 'mongoose';
import {productService,categoryService} from '../service/service.js'
import cloudinary from '../utils/cloudinary.js';
import {promises as fsPromises} from 'fs'


const getAll = async(req,res) =>{
    
    const products = await productService.getProducts();


    if(products.length === 0){
        return res.sendNotFound('There are no registered products');
    }

    return res.sendSuccessWithPayload(products);
}

const getOneById = async(req,res) =>{
    const pid = req.params.id;

    if (!mongoose.isValidObjectId(pid)) {
        return res.sendBadRequest('Invalid ID format');
    }

    const product = await productService.getProductsById(pid);
    if(!product){
        res.sendNotFound('Product not found');
    }

    return res.sendSuccessWithPayload(product);
}

const getOneByCode = async(req,res) =>{
    const pcode = req.params.code;

    const product = await productService.getProductByCode(code);

    if(!product){
        res.sendNotFound('Information missing');
    }

    return res.sendSuccessWithPayload(product);
}

const createProduct = async(req,res) =>{
    const {title,description,code,price,category} = req.body;

    if(!title || !description || !code || !price || !category){
        return res.sendBadRequest('Information missing');
    }

    if(price <= 0){
        return res.sendBadRequest('Price must be a positive number');
    }

    if(!mongoose.isValidObjectId(category)){
        return res.sendBadRequest('Invalid category ID');
    }

    const existingProduct  = await productService.getProductByCode(code);
    if(existingProduct ){
        return res.sendBadRequest('The code cannot be repeated');
    }

    const resultCategory = await categoryService.getCategoryById(category);
    if(!resultCategory){
        return res.sendBadRequest('Category not found');
    }

    const folder = `Sanson Fit/${resultCategory.type}/${resultCategory.name}`;
    const thumbnails = [];

    try {
        const uploadedImage = await Promise.all(
            req.files.map((file, index) => 
                cloudinary.uploader.upload(file.path, {
                    public_id:`${code}-image-${index}`,
                    folder:folder
                })
            )
        );

        thumbnails.push(...uploadedImage.map((image, index) => ({
            mimeType: req.files[index].mimeType,
            url: image.secure_url,
            main: index == 0
        })))        

    } catch (error) {
        req.logger.error(`Error uploading images: ${error}`);
        return res.sendBadRequest('Failed to upload images to Cloudinary');
    } finally {
        await Promise.all(req.files.map(file => fsPromises.unlink(file.path)))
        req.logger.info('File is deleted')
    }

    const newProduct = {
        title,
        description,
        code,
        price,
        category,
        thumbnails
    }

    const result = await productService.createProduct(newProduct)

    if(!result){
        return res.sendBadRequest('Could not create product');
    }

    return res.sendSuccess('Product created');
}

const updateProduct = async(req,res) =>{
    const pid = req.params.id;
    const {title,description,price,discount,category,globalStatus} = req.body;

    if(!mongoose.isValidObjectId(pid)){
        return res.sendBadRequest('Invalid Product ID');
    }

    const product = await productService.getProductsById(pid);
    if(!product){
        return res.sendNotFound('Product not found');
    }

    if (price !== undefined && (typeof price !== 'number' || price <= 0)) {
        return res.sendBadRequest('Price must be a positive number');
    }

    if (category && !mongoose.isValidObjectId(category)) {
        return res.sendBadRequest('Invalid Category ID');
    }

    // Creamos un objeto que reflejara la actualizacion del producto
    let updateFields = {}

    // Aca detectamos si vamos a modificar en la 1ra seccion o 2da
    if(discount !== undefined || globalStatus !== undefined){

        if(discount !== undefined) updateFields.discount = discount

        if(globalStatus !== undefined) updateFields.globalStatus = globalStatus

    }else{

        if(!title || !description || !price || !category){
            return res.sendBadRequest('Information missing');
        }

        updateFields = {
            title,
            description,
            price,
            category
        }

    }

    try {
        const updatedProduct = await productService.updateProduct(pid,updateFields);
        if(!updatedProduct){
            return res.sendBadRequest('Could not update product');
        }

        res.sendSuccessWithPayload(updatedProduct)
    } catch (error) {
        req.logger.error(`Error updating product: ${error}`);
        return res.sendServerError('An error occurred while updating the product');
    }
}

const eliminate = async(req,res)=>{
    const pid = req.params.id;

    if(!mongoose.isValidObjectId(pid)){
        return res.sendBadRequest('Invalid Product ID');
    }

    const product = await productService.getProductsById(pid);
    if(!product){
        return res.sendNotFound('Product not found');
    }

    const category = await categoryService.getCategoryById(product.category);
    if(!category){
        return res.sendNotFound('Category not found');
    }

    const publicId = `Sanson Fit/${category.type}/${category.name}/${product.code}-image`
    
    try {

        const cloudinaryResponse = await Promise.all(
            product.thumbnails.map((_, index) =>
                cloudinary.uploader.destroy(`${publicId}-${index}`)
            )
        );

        const errors = cloudinaryResponse.filter(response => response.result !== 'ok');
        if (errors.length > 0) {
            return res.sendBadRequest('Failed to delete some images from Cloudinary');
        }

        const result = await productService.deleteProduct(pid);
        if(!result){
            return res.sendBadRequest('Could not delete product');
        }
        
        res.sendSuccess(`Product '${product.title}' deleted successfully`);

    } catch (error) {
        req.logger.error(`Error deleting product: ${error}`);
        return res.sendServerError('An error occurred while deleting the product');
    }
};

export default{
    createProduct,
    getAll,
    getOneById,
    getOneByCode,
    eliminate,
    updateProduct
}
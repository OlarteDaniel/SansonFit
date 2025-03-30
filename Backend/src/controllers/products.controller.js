import mongoose from 'mongoose';
import {productService,categoryService,supplementVariantsService} from '../service/service.js'
import cloudinary from '../utils/cloudinary.js';
import {promises as fsPromises} from 'fs'


const getAll = async(req,res) =>{
    
    try {
        const products = await productService.getProducts();
        if(products.length === 0){
            return res.sendNotFound('There are no registered products');
        }
        req.logger.info('Products fetched successfully');
        return res.sendSuccessWithPayload(products);

    } catch (error) {
        req.logger.error(`Error getting products: ${error}`);
        return res.sendServerError('An error occurred while fetching products.');
    }
}

const getAllByCategory = async (req, res) => {
    try {
        const { type, name } = req.params; // Destructuración directa

        if (!type) {
            return res.sendBadRequest('Type is required');
        }

        const products = await productService.getProducts();
        if (!products || products.length === 0) {
            return res.sendNotFound('There are no registered products');
        }

        const resultCategory = await categoryService.getCategoriesByTypeAndName(type, name);
        if (!resultCategory) {
            return res.sendBadRequest('Category not found');
        }

        const productWithCategory = products.filter(product => 
            product.category?.toString() === resultCategory._id.toString()
        );

        req.logger.info(`Products successfully obtained with the category: ${type}-${name}`);
        return res.sendSuccessWithPayload(productWithCategory);
    } catch (error) {
        console.error('Error in getAllByCategory:', error);
        return res.sendServerError('An unexpected error occurred');
    }
};

const getOneById = async(req,res) =>{
    try {
        const pid = req.params.id;
        if (!mongoose.isValidObjectId(pid)) {
            return res.sendBadRequest('Invalid ID format');
        }

        const product = await productService.getProductsById(pid);
        if(!product){
            req.logger.info(`There is no product with this id`);
            res.sendNotFound('Product not found');
        }

        req.logger.info('Product obtained successfully');
        return res.sendSuccessWithPayload(product);
    } catch (error) {
        req.logger.error(`Error getting product: ${error}`);
        return res.sendServerError('An error occurred while fetching product.');
    }
}

const getOneByCode = async(req,res) =>{
    try {
        const pcode = req.params.code;

        const product = await productService.getProductByCode(pcode);
        if(!product){
            req.logger.info(`There is no product with this code`);
            res.sendNotFound('Information missing');
        }

        req.logger.info('Product obtained successfully');
        return res.sendSuccessWithPayload(product);
    } catch (error) {
        req.logger.error(`Error getting product: ${error}`);
        return res.sendServerError('An error occurred while fetching product.');
    }
}

const createProduct = async(req,res) =>{
    let code = '';
    const {title,description,price,category,globalStatus} = req.body;

    if(!title || !description || !price || !category){
        return res.sendBadRequest('Information missing');
    }

    if(price <= 0){
        return res.sendBadRequest('Price must be a positive number');
    }

    if(!mongoose.isValidObjectId(category)){
        return res.sendBadRequest('Invalid category ID');
    }

    const resultCategory = await categoryService.getCategoryById(category);
    if(!resultCategory){
        return res.sendBadRequest('Category not found');
    }

     // Generar código único
    const typeInitial = resultCategory.type ? resultCategory.type.charAt(0).toUpperCase() : 'X';
    const nameSegment = resultCategory.name ? resultCategory.name.substring(0, 4).toUpperCase().padEnd(4, '_') : 'XXXX';

    const productCount = await productService.countProductsByCategory(resultCategory._id);
    code = `${typeInitial}${nameSegment}${productCount}`;

    // Verificar si el código ya existe
    const existingProduct = await productService.getProductByCode(code);
    if (existingProduct) {
        return res.sendBadRequest('The code cannot be repeated');
    }

    // Configurar Cloudinary
    const folder = `Sanson Fit/${resultCategory.type}/${resultCategory.name}`;
    const thumbnails = [];

    try {
        // Subir imágenes a Cloudinary
        const uploadedImages = await Promise.all(
            req.files.map((file, index) =>
                cloudinary.uploader.upload(file.path, {
                    public_id: `${code}-image-${index}`,
                    folder: folder
                })
            )
        );

        // Formatear imágenes
        thumbnails.push(...uploadedImages.map((image, index) => ({
            mimeType: req.files[index].mimeType,
            url: image.secure_url,
            main: index === 0,
            fileId: `${code}-image-${index}`
        })));      

    } catch (error) {
        req.logger.error(`Error uploading images: ${error}`);
        return res.sendBadRequest('Failed to upload images to Cloudinary');
    } 

    // Limpiar archivos locales
    await Promise.all(req.files.map(file => fsPromises.unlink(file.path)));
    req.logger.info('Temporary files deleted');


    // Crear producto
    const newProduct = {
        title,
        description,
        code,
        price,
        category,
        globalStatus,
        thumbnails
    }
    const result = await productService.createProduct(newProduct)

    if(!result){
        return res.sendBadRequest('Could not create product');
    }
    return res.sendCreated('Product created',result);
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

    if(!title || !description || !price ||!category){
        return res.sendBadRequest('Information missing');
    }


    const updateFields = {
        title,
        description,
        price,
        category,
        discount: discount || 0,
        globalStatus: globalStatus || false
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
        
        const resultVariants = await supplementVariantsService.getAllByProduct(pid);
        if (resultVariants?.length > 0) {
            const deleteVariantsResult = await supplementVariantsService.deleteManyByProduct(pid);
            if (!deleteVariantsResult) {
                return res.sendBadRequest('Could not delete product variants');
            }
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
    getAllByCategory,
    getOneById,
    getOneByCode,
    eliminate,
    updateProduct
}
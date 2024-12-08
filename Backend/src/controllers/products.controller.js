import {productService,categoryService,supplementService,apparelService} from '../service/service.js'
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

    const publicId = `Sanson Fit/${category.type}/${category.name}/${product.code}-image`
    
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
    eliminate
}
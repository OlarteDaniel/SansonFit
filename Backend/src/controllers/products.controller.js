import {productService} from '../service/service.js'

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

    if(!title || !description || !price || !category){
        return res.sendBadRequest('Information missing');
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

export default{
    getAll,
    getOne,
    create
}
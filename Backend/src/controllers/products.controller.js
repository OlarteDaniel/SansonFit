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

    const result = await productService.deleteProduct(pid);

    if(!result){
        return res.sendBadRequest('Could not delete product');
    }

    res.sendSuccess('Deleted product')
}

export default{
    getAll,
    getOne,
    create,
    update,
    eliminate
}
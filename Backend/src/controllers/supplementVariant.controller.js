import mongoose from 'mongoose';
import {productService,supplementVariantsService} from '../service/service.js'

const getAllByFlavor = async(req,res) =>{
    const flavor = req.params.flavor;
    if (!flavor) {
        return res.sendBadRequest('Flavor is required');
    }

    try {
        
        const products = await supplementVariantsService.getAllByFlavor(flavor);
        if(!products || products.length === 0){
            req.logger.info(`No products found for flavor: ${flavor}`);
            return res.sendNotFound('flavor not found');
        }

        req.logger.info(`Products fetched successfully for flavor: ${flavor}`);
        return res.sendSuccessWithPayload(products);
    } catch (error) {
        req.logger.error(`Error fetching products by flavor: ${error}`);
        return res.sendServerError('An error occurred while fetching products');
    }

}

const addFlavor = async(req,res)=>{
    const pid = req.params.id;
    const {flavor, quantity} = req.body;

    if(!mongoose.isValidObjectId(pid)){
        return res.sendBadRequest('Invalid ID');
    }

    const product = await productService.getProductsById(pid);
    if(!product){
        return res.sendNotFound('Product not found');
    }

    if(!flavor || !quantity){
        return res.sendBadRequest('Information missing');
    }

    if(quantity < 0){
        return res.sendBadRequest('Price must be a positive number');
    }

    const newFlavor = {
        productId: pid,
        flavor,
        quantity
    }

    const result = await supplementVariantsService.createSupplement(newFlavor);
    if(!result){
        return res.sendBadRequest('Failed to implement new flavor');
    }

    return res.sendSuccess('Added flavor');
}

const updateFlavor = async(req,res)=>{
    const fid = req.params.id;
    const {productId,flavor,quantity,discount,status} = req.body;

    if(!mongoose.isValidObjectId(fid)){
        return res.sendBadRequest('Invalid Flavor ID');
    }

    const supplementVariant = await supplementVariantsService.getById(fid);
    if(!supplementVariant){
        return res.sendNotFound('supplement Variant not found');
    }

    let updateFields = {};

    if(discount !== undefined || status !== undefined){
        if(discount !== undefined) updateFields.discount = discount

        if(status !== undefined) updateFields.status = status
    }else{

        if(!productId || !flavor || !quantity){
            return res.sendBadRequest('Information missing');
        }

        if(!mongoose.isValidObjectId(productId)){
            return res.sendBadRequest('Invalid Product ID');
        }

        updateFields = {
            productId,
            flavor,
            quantity
        }

    }

    try {
        const updateSupplementeVariant = await supplementVariantsService.updateSupplement(fid,updateFields);
        if(!updateSupplementeVariant){
            return res.sendBadRequest('Could not update Supplement Variant');
        }

        res.sendSuccessWithPayload(updateSupplementeVariant)
    } catch (error) {
        req.logger.error(`Error updating Supplement Variant: ${error}`);
        return res.sendServerError('An error occurred while updating the Supplement Variant');
    }
}


export default {
    addFlavor,
    getAllByFlavor,
    updateFlavor
}
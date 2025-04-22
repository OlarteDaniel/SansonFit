import mongoose from 'mongoose';
import {productService,supplementVariantsService} from '../service/service.js'

const getAll = async(req,res) =>{
    try {
        const supplementeVariants = await supplementVariantsService.getAll();
        if(supplementeVariants.length === 0){
            return res.sendNotFound('There are no registered Variants');
        }
        req.logger.info('Supplement Variants fetched successfully');
        res.sendSuccessWithPayload(supplementeVariants);

    } catch (error) {
        req.logger.error(`Error getting supplement variants: ${error}`);
        return res.sendServerError('An error occurred while fetching supplement variants.');
    }
}

const getAllByFlavor = async (req, res) => {
    try {
        const flavor = req.params.flavor;
        if (!flavor) {
            return res.sendBadRequest('Flavor is required');
        }
        const products = await supplementVariantsService.getAllByFlavor(flavor);
        if (!products || products.length === 0) {
            req.logger.info(`No products found for flavor: ${flavor}`);
            return res.sendNotFound('Flavor not found');
        }
        req.logger.info(`Products fetched successfully for flavor: ${flavor}`);
        return res.sendSuccessWithPayload(products);
    } catch (error) {
        req.logger.error(`Error fetching products by flavor: ${error}`);
        return res.sendServerError('An error occurred while fetching products');
    }
};

const getAllByProduct = async (req, res) => {
    try {
        const pid = req.params.id;
        if (!mongoose.isValidObjectId(pid)) {
            return res.sendBadRequest('Invalid Product ID');
        }
        const variants = await supplementVariantsService.getAllByProduct(pid);
        if (!variants || variants.length === 0) {
            req.logger.info(`This product does not have flavors`);
            return res.sendNotFound('Product without flavors');
        }
        req.logger.info('The product has flavors');
        return res.sendSuccessWithPayload(variants);
    } catch (error) {
        req.logger.error(`Error getting product flavors: ${error}`);
        return res.sendServerError('An error occurred while fetching flavors.');
    }
};

const getByProductAndFlavor = async (req, res) => {
    try {
        const { pid, flavor } = req.params;
        if (!mongoose.isValidObjectId(pid)) {
            return res.sendBadRequest('Invalid Product ID');
        }
        const product = await productService.getProductsById(pid);
        if (!product) {
            return res.sendNotFound('Product not found');
        }
        if (!flavor) {
            return res.sendBadRequest('Flavor is required');
        }
        const variant = await supplementVariantsService.getByProductFlavors(pid, flavor);
        if (!variant) {
            req.logger.info(`This product does not have the flavor ${flavor}`);
            return res.sendNotFound('Flavor not found');
        }
        req.logger.info(`Product flavor retrieved successfully`);
        return res.sendSuccessWithPayload(variant);
    } catch (error) {
        req.logger.error(`Error getting product flavors: ${error}`);
        return res.sendServerError('An error occurred while retrieving product flavors.');
    }
};

const addFlavor = async (req, res) => {
    try {
        const pid = req.params.id;
        const { flavor, quantity } = req.body;
        if (!mongoose.isValidObjectId(pid)) {
            return res.sendBadRequest('Invalid ID');
        }
        const product = await productService.getProductsById(pid);
        if (!product) {
            return res.sendNotFound('Product not found');
        }
        if (!flavor || !quantity) {
            return res.sendBadRequest('Information missing');
        }
        if (quantity < 0) {
            return res.sendBadRequest('Quantity must be a positive number');
        }
        const newFlavor = { productId: pid, flavor, quantity };
        const result = await supplementVariantsService.createSupplement(newFlavor);
        const resultUpdateStock = await productService.updateProduct(pid, { stock: Number(product.stock) + Number(quantity) });
        if (!result || !resultUpdateStock) {
            return res.sendBadRequest('Failed to implement new flavor');
        }
        req.logger.info(`Flavor added successfully: ${flavor}`);
        return res.sendCreated('Added flavor', result);
    } catch (error) {
        req.logger.error(`Error adding flavor: ${error}`);
        return res.sendServerError('An error occurred while adding the flavor.');
    }
};

// const updateFlavor = async(req,res)=>{
//     const fid = req.params.id;
//     const { productId, flavor, quantity, newQuantity, discount, status } = req.body;
//     let product = {};
    
//     // Verificación del ID del sabor
//     if (!mongoose.isValidObjectId(fid)) {
//         return res.sendBadRequest('Invalid Flavor ID');
//     }

//     // Buscar la variante del suplemento
//     const supplementVariant = await supplementVariantsService.getById(fid);
//     if (!supplementVariant) {
//         return res.sendNotFound('Supplement Variant not found');
//     }

//     let updateFields = {};

//     // Actualización de descuento o estado, si es necesario
//     if(discount !== undefined || status !== undefined){
//         if(discount !== undefined) updateFields.discount = discount

//         if(status !== undefined) updateFields.status = status
//     }else{
//         if(!flavor || !quantity){
//             return res.sendBadRequest('Information missing');
//         }

//         updateFields = {
//             flavor,
//             quantity
//         }

//         // Si se especifica el ID del producto, aseguramos que no se toque el stock general
//         if(productId){
//             if(!mongoose.isValidObjectId(productId)){
//                 return res.sendBadRequest('Invalid Product ID');
//             }

//             product = await productService.getProductsById(productId);
//             const resultUpdateStock = await productService.updateProduct(productId, {
//                 stock: Number(product.stock) + Number(newQuantity),
//             });            
//             if(!resultUpdateStock){
//                 return res.sendBadRequest('Could not update product stock');
//             }
//         }
//     }

//     try {
//         // Actualizar la variante del suplemento sin modificar el stock general
//         const updateSupplementVariant = await supplementVariantsService.updateSupplement(fid, updateFields);
//         if (!updateSupplementVariant) {
//             return res.sendBadRequest('Could not update Supplement Variant');
//         }

//         res.sendSuccessWithPayload(updateSupplementVariant);
//     } catch (error) {
//         req.logger.error(`Error updating Supplement Variant: ${error}`);
//         return res.sendServerError('An error occurred while updating the Supplement Variant');
//     }
// }

const updateFlavor = async(req,res) =>{
    const fid = req.params.id;
    const { productId, flavor, quantity, newQuantity, discount, status } = req.body;

    try {
        // Verificación del ID del sabor
        if (!mongoose.isValidObjectId(fid)) {
            return res.sendBadRequest('Invalid Flavor ID');
        }

        if(!mongoose.isValidObjectId(productId)){
            return res.sendBadRequest('Invalid Product ID');
        }

        // Buscar la variante del suplemento
        const supplementVariant = await supplementVariantsService.getById(fid);
        if (!supplementVariant) {
            return res.sendNotFound('Supplement Variant not found');
        }

        const product = await productService.getProductsById(productId);
        if (!product) {
            return res.sendNotFound('Product not found');
        }

        let updateFields = {};

        if(discount !== undefined || status !== undefined){
            updateFields = {
                flavor,
                quantity,
                discount,
                status
            }
        }else{
            if(!flavor || !quantity){
                return res.sendBadRequest('Information missing');
            }

            updateFields = {
                flavor,
                quantity
            }
        }

        if(newQuantity){
            const resultUpdateStock = await productService.updateProduct(productId, {
                stock: Number(product.stock) + Number(newQuantity),
            });            
            if(!resultUpdateStock){
                return res.sendBadRequest('Could not update product stock');
            }
        }else{
            const resultUpdateStock = await productService.updateProduct(productId, {
                stock: (Number(product.stock) - Number(supplementVariant.quantity) + Number(quantity)),
            });    
            if(!resultUpdateStock){
                return res.sendBadRequest('Could not update product stock');
            }
        }

        const updateSupplementVariant = await supplementVariantsService.updateSupplement(fid, updateFields);
        if (!updateSupplementVariant) {
            return res.sendBadRequest('Could not update Supplement Variant');
        }

        res.sendSuccessWithPayload(updateSupplementVariant);
    } catch (error) {
        req.logger.error(`Error updating Supplement Variant: ${error}`);
        return res.sendServerError('An error occurred while updating the Supplement Variant');
    }

}

const deleteFlavor = async (req, res) => {
    try {
        const fid = req.params.id;
        if (!mongoose.isValidObjectId(fid)) {
            return res.sendBadRequest('Invalid Flavor ID');
        }
        const supplement = await supplementVariantsService.getById(fid);
        if (!supplement) {
            return res.sendNotFound('Flavor not found');
        }
        const result = await supplementVariantsService.deleteSupplement(fid);
        if (!result) {
            return res.sendBadRequest('Could not delete flavor');
        }
        req.logger.info(`Flavor '${supplement.flavor}' deleted successfully`);
        res.sendSuccess(`Supplement '${supplement.flavor}' deleted successfully`);
    } catch (error) {
        req.logger.error(`Error deleting supplement: ${error}`);
        return res.sendServerError('An error occurred while deleting the supplement');
    }
};

export default {
    addFlavor,
    deleteFlavor,
    getAll,
    getAllByFlavor,
    getAllByProduct,
    getByProductAndFlavor,
    updateFlavor
}
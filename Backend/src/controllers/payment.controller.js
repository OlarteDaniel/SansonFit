import mongoose from 'mongoose';
import config from '../config/config.js';
import {productService,supplementVariantsService} from '../service/service.js'
import { Payment } from 'mercadopago';
import client from '../config/mercadoPago.config.js';
import {createPreference} from '../service/mercadoPagoService.js'

const createPayment = async(req,res) =>{
    
    const itemsForMP = [];

    try {
        const products = req.body.products; // Debe venir como array en el body

        if (!products || !Array.isArray(products) || products.length === 0) {
            return res.sendBadRequest( 'Productos no válidos.' );
        }

        for(const item of products){
            if(
                !mongoose.isValidObjectId(item.productId) ||
                !mongoose.isValidObjectId(item.variantId)
            ){
                return res.sendBadRequest( 'Productos no válidos.' );
            }

            const product = await productService.getProductsById(item.productId)
            const variant = await supplementVariantsService.getById(item.variantId);

            if(!product || !variant){
                return res.sendBadRequest( 'Productos no válidos.' );
            }

            if(variant.quantity < item.count){
                return res.sendBadRequest( `Cantidad insuficiente en el product: ${variant.flavor}`);
            }
            const discount = product.discount + variant.discount;
            const discountedPrice = product.price - (product.price * (discount / 100));
            itemsForMP.push({
                title:`${product.title} - ${variant.flavor}`,
                price:discountedPrice,
                quantity:item.count,
                variantId: variant._id
            })
        }

        const response = await createPreference(itemsForMP);
        return res.sendSuccessWithPayload({url:response.init_point});
    } catch (error) {
        req.logger.error('Error al crear la preferencia:', error.message);
        return res.sendBadRequest('Error al procesar el pago.');
    }
}

const success = async(req,res) =>{
    res.redirect(`${config.frontend.URL}/success`);
}

const failure = async(req,res) =>{
    res.redirect(`${config.frontend.URL}/failure`);
}

const pending = async(req,res) =>{
    res.redirect(`${config.frontend.URL}/pending`);
}

const receiveWebhook = async(req,res) =>{
    try {
        const {body} = req
        const payment = new Payment(client);

        if(body.type === 'payment'){
            const result = await payment.get({id:body.data.id});

            const items = result.metadata.items || [];

            for(const item of items){
                const {variant_id,quantity} = item;

                const variant = await supplementVariantsService.getById(variant_id);
                if(!variant) continue; //Utilizamos el continue para que salga del bucle en caso de no encontrar una variante

                const product = await productService.getProductsById(variant.productId);
                if(!product) continue;

                const resultUpdateVariant = await supplementVariantsService.updateSupplement(variant_id,{quantity: Number(variant.quantity) - Number(quantity)})
                const resultUpdateProduct = await productService.updateProduct(product._id,{stock: Number(product.stock) - Number(quantity)})

                if (!resultUpdateVariant || !resultUpdateProduct) {
                    return res.sendBadRequest('The product variant could not be reduced');
                }

                req.logger.info(`Variant: ${variant.flavor} correctly reduced`);
            }

            return res.sendSuccess('Updated stock')

        }

        

        

        res.sendStatus(200);
    } catch (error) {
        console.error('Error en webhook:', error);
        res.sendStatus(500);
    }
}


export default {
    createPayment,
    success,
    failure,
    pending,
    receiveWebhook
}
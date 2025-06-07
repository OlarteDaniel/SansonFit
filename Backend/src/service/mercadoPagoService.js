import { Preference } from 'mercadopago';
import client from '../config/mercadoPago.config.js';

export const createPreference = async (productData) =>{

    const publicUrl = process.env.PUBLIC_URL

    const preference = new Preference(client);

    const result = await preference.create({
        body: {
            items: productData.map(product => ({
                title:product.title,
                unit_price: Number(product.price),
                quantity: Number(product.quantity),
                currency_id: "ARS"
            })),
            back_urls: {
                success:`${publicUrl}/api/payments/success`,
                failure:`${publicUrl}/api/payments/failure`,
                pending:`${publicUrl}/api/payments/pending`,
            },
            notification_url: `${publicUrl}/api/payments/webhook`,
            metadata: {
                items: productData
            }
        }
    });

    

    return result; // Esto es lo que necesitás para redirigir al usuario
};


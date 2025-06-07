import { MercadoPagoConfig } from 'mercadopago';
import config from './config.js'

const client = new MercadoPagoConfig({ accessToken:config.mercadoPago.ACCESS_TOKEN });

export default client
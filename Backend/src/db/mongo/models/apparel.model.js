import mongoose from 'mongoose';
import productModel from './product.model.js';

const collection = 'Apparel';

const schema = new mongoose.Schema({
    size: {
        type: String,
        required: true
    },
    material: {
        type: String,
        required: true
    }
});

const apparelModel = productModel.discriminator(collection,schema);

export default apparelModel;

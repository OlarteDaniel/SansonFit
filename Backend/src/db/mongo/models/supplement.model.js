import mongoose from 'mongoose';
import productModel from './product.model.js';

const collection = 'Supplements';

const schema = new mongoose.Schema({
    flavor: {
        type: String,
        required: true
    },
    weight:{
        type: String,
        required: true
    }
});

const supplementModel = productModel.discriminator(collection,schema);

export default supplementModel;
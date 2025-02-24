import mongoose from 'mongoose';

const collection = 'Apparel';

const schema = new mongoose.Schema({
    productId:{
        type: mongoose.SchemaTypes.ObjectId,
        index:true,
        ref:'Products',
        required:true
    },
    size: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    quantity:{
        type: Number,
        default: 1
    },
    discount:{
        type: Number,
        default: 0
    },
    status:{
        type:Boolean,
        default: true
    }
});

const apparelModel = mongoose.model(collection,schema);

export default apparelModel;

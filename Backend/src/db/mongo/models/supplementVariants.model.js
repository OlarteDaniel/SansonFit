import mongoose from 'mongoose';

const collection = 'supplementVariants';

const schema = new mongoose.Schema({

    productId:{
        type: mongoose.SchemaTypes.ObjectId,
        index:true,
        ref:'Products',
        required:true
    },
    flavor:{
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

const supplementModel = mongoose.model(collection,schema);

export default supplementModel;
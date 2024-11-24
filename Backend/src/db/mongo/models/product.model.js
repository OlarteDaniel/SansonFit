import mongoose from 'mongoose';

const collection = 'Products';

const schema = new mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    stock:{
        type:Number,
        default: 1
    },
    category:{
        type:mongoose.SchemaTypes.ObjectId,
        ref: 'Categories',
        required:true
    },
    thumbnails:{
        type:Array,
        default:[]
    }
});

const productModel = mongoose.model(collection,schema);

export default productModel;
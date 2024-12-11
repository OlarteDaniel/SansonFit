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
    code:{
        type:String,
        required:true,
        unique: true
    },
    price:{
        type:Number,
        required:true
    },
    discount:{
        type:Number,
        default: 0
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
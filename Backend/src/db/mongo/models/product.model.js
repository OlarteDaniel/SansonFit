import mongoose from 'mongoose';

const collection = 'Products';

const baseOptions = {
    discriminatorKey : 'type', //Clave para distinguir tipos
    collection: collection //Todos los documentos van a esta coleccion
}

const baseSchema = new mongoose.Schema({
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
    status:{
        type:Boolean,
        default:true
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
}, baseOptions);

const productModel = mongoose.model(collection,baseSchema);

export default productModel;
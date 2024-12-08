import mongoose from 'mongoose';

const collection = 'Categories';

const schema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    type:{
        type:String,
        enum:['apparel','supplements'],
        default:'supplements'
    }
})

const categoryModel = mongoose.model(collection,schema);

export default categoryModel;
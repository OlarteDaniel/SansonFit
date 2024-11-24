import mongoose, { model } from 'mongoose';

const collection = 'Categories';

const schema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    }
})

const categoryModel = mongoose.model(collection,schema);

export default categoryModel;
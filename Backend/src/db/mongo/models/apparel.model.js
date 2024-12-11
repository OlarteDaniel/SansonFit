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
    }
});

const apparelModel = mongoose.model(collection,schema);

export default apparelModel;

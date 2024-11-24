import mongoose from 'mongoose';

const collection = 'Users';

const schema = new mongoose.Schema({
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    birthdate:{
        type:Date,
    },
    password:{
        type:String,
        required:true
    },
    roles:{
        type:String,
        enum:['user','admin'],
        default:'user'
    }
});

const userModel = mongoose.model(collection,schema);

export default userModel;
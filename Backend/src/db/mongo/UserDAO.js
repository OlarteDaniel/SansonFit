import userModel from './models/user.model.js';

export default class UserDAO {

    async get(){
        return userModel.find();
    }

    async getOne(params){
        return userModel.findOne(params);
    }

    async create(user){
        return userModel.create(user);
    }
}
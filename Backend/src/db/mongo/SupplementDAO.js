import supplementModel from "./models/supplement.model.js";

export default class SupplementDAO{

    async get(filter = null){
        return supplementModel.find(filter);
    }

    async getOne(params){
        return supplementModel.findOne(params);
    }

    async create(supplement){
        return supplementModel.create(supplement);
    }

    async update(id,supplement){
        return supplementModel.updateOne({_id:id},{$set:supplement});
    }

}
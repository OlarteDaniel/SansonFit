import supplementModel from "./models/supplementVariants.model.js";

export default class SupplementVariantDAO{

    async get(filter = null){
        return supplementModel.find(filter);
    }

    async getOne(params){
        return supplementModel.findOne(params).populate('productId');;
    }

    async create(supplement){
        return supplementModel.create(supplement);
    }

    async update(id,supplement){
        return supplementModel.updateOne({_id:id},{$set:supplement});
    }

    async delete(id){
        return supplementModel.deleteOne(id);
    }

}
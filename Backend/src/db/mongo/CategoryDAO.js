import categoryModel from './models/category.model.js';

export default class CategoryDAO{

    async get(filter = null){
        return categoryModel.find(filter);
    }

    async getOne(params){
        return categoryModel.findOne(params);
    }

    async create(category){
        return categoryModel.create(category);
    }

    async update(id,category){
        return categoryModel.updateOne({_id:id},{$set:category});
    }

    async delete(id){
        return categoryModel.deleteOne(id);
    }

}
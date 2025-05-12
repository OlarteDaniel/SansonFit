import productModel from './models/product.model.js'

export default class ProductDAO{

    async count(filter = null){
        return productModel.countDocuments(filter);
    }

    async get(filter = null, options = null){
        if (options) {
            return productModel.paginate(filter, options);
        } else {
            return productModel.find(filter);
        }
    }

    async getOne(params){
        return productModel.findOne(params);
    }

    async create(product){                                     
        return productModel.create(product);
    }

    async update(id,product){                                   
        return productModel.updateOne({_id:id},{$set:product}); 
    }

    async delete(id){
        return productModel.deleteOne(id);
    }

}
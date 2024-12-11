import productModel from './models/product.model.js'

export default class ProductDAO{

    async get(filter = null){
        return productModel.find(filter);
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
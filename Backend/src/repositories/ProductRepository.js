export default class ProductRepository{

    constructor(dao){
        this.dao = dao;
    }

    getProducts(){
        return this.dao.get();
    }

    getProductsById(id){
        return this.dao.getOne({_id:id});
    }

    createProduct(product){
        return this.dao.create(product);
    }

    updateProduct(id,product){
        return this.dao.update(id,product);
    }

    deleteProduct(id){
        return this.dao.delete({_id:id});
    }

}
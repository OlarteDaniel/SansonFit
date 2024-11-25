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

    updateProduct(idProduct,product){
        return this.dao.update(idProduct,product);
    }

    deleteProduct(id){
        return this.dao.delete({_id:id});
    }

}
export default class ApparelRepository{
    constructor(dao){
        this.dao = dao
    }

    getAll(){
        return this.dao.get();
    }

    getAllBySize(size) {
        return this.dao.get({ size:size });
    }

    getAllByProduct(productId){
        return this.dao.get({productId:productId});
    }

    getAllByProductSizes(productId,size){
        return this.dao.get({productId:productId,size:size});
    }

    getById(id){
        return this.dao.getOne({_id:id});
    }

    createApparel(apparel){
        return this.dao.create(apparel);
    }

    updateApparel(id,apparel){
        return this.dao.update(id,apparel);
    }

}
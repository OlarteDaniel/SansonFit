export default class SupplementRepository{
    constructor(dao){
        this.dao = dao
    }

    getAll(){
        return this.dao.get();
    }

    getAllByFlavor(flavor) {
        return this.dao.get({ flavor:flavor });
    }

    getAllByProduct(productId){
        return this.dao.get({productId:productId});
    }

    getById(id){
        return this.dao.getOne({_id:id})
    }

    createSupplement(supplement){
        return this.dao.create(supplement);
    }

    updateSupplement(id,supplement){
        return this.dao.update(id,supplement);
    }

}
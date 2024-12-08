export default class ApparelRepository{
    constructor(dao){
        this.dao = dao
    }

    getAll(){
        return this.dao.get();
    }

    getBySize(size) {
        return this.dao.getOne({ size:size });
    }

    createApparel(apparel){
        return this.dao.create(apparel);
    }

    updateApparel(id,apparel){
        return this.dao.update(id,apparel);
    }

}
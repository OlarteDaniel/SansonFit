export default class SupplementRepository{
    constructor(dao){
        this.dao = dao
    }

    getAll(){
        return this.dao.get();
    }

    getAllBySize(size){
        return this.dao.get({size:size});
    }

    getByFlavor(flavor) {
        return this.dao.get({ flavor:flavor });
    }

    createSupplement(supplement){
        return this.dao.create(supplement);
    }

    updateSupplement(id,supplement){
        return this.dao.update(id,supplement);
    }

}
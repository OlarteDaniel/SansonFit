import apparelModel from "./models/apparel.model.js";

export default class ApparelDAO {

    async get(filter = null){
        return apparelModel.find(filter);
    }

    async getOne(params){
        return apparelModel.findOne(params);
    }

    async create(apparel){
        return apparelModel.create(apparel);
    }

    async update(id,apparel){
        return apparelModel.updateOne({_id:id},{$set:apparel});
    }

}
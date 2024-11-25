import { categoryService } from "../service/service.js";

const getAll = async(req,res)=>{
    const categories = await categoryService.getCategories();

    if(categories.length === 0){
        return res.sendNotFound('There are no registered categories');
    }

    return res.sendSuccessWithPayload(categories);
}

export default{
    getAll
}
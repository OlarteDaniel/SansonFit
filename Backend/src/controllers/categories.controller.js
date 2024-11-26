import { categoryService } from "../service/service.js";

const getAll = async(req,res)=>{
    const categories = await categoryService.getCategories();

    if(categories.length === 0){
        return res.sendNotFound('There are no registered categories');
    }

    return res.sendSuccessWithPayload(categories);
}

const getOne = async(req,res)=>{
    const cid = req.params.id;

    const category = await categoryService.getCategoryById(cid);
    
    if(!category){
        res.sendNotFound('Categoy not found');
    }

    return res.sendSuccessWithPayload(category);
}

const create = async(req,res)=>{
    const {name} = req.body;

    if(!name){
        return res.sendBadRequest('Information missing');
    }

    const newCategory = {
        name
    }

    const result = await categoryService.createCategory(newCategory);

    if(!result){
        return res.sendBadRequest('Could not create product');
    }

    return res.sendSuccess('Category created');
}

const update = async(req,res)=>{
    const cid = req.params.id;
    const {name} = req.body;

    const category = await categoryService.getCategoryById(cid);
    if(!category){
        res.sendNotFound('Categoy not found');
    }

    if(!category) return res.sendBadRequest('Information missing');

    const updateCategory = {
        name
    }

    const result = await categoryService.updateCategory(cid,updateCategory);

    if(!result){
        return res.sendBadRequest('Could not update product');
    }

    return res.sendSuccess('Category Update');
}

const eliminate = async(req,res)=>{
    const cid = req.params.id;

    const category = await categoryService.getCategoryById(cid);
    if(!category){
        res.sendNotFound('Categoy not found');
    }

    const result = await categoryService.deleteCategory(cid);

    if(!result){
        return res.sendBadRequest('Could not delete product');
    }

    return res.sendSuccess('Category Delete');
}

export default{
    getAll,
    getOne,
    create,
    update,
    eliminate
}
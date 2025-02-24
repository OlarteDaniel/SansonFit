export default class CategoryRepository {

    constructor(dao){
        this.dao = dao;
    }

    getCategories(){
        return this.dao.get();
    }

    getCategoriesByTypeAndName(type, name) {
        return this.dao.getOne({type:type,name:name})
    }

    getCategoryById(id){
        return this.dao.getOne({_id:id});
    }

    createCategory(category){
        return this.dao.create(category);
    }

    updateCategory(id,category){
        return this.dao.update(id,category)
    }

    deleteCategory(id){
        return this.dao.delete({_id:id});
    }

}
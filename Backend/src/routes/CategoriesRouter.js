import BaseRouter from "./BaseRouter.js";

import categoriesController from "../controllers/categories.controller.js";

class CategoriesRouter extends BaseRouter{

    init(){

        this.get('/',categoriesController.getAll);

        this.get('/:id',categoriesController.getOne);

        this.post('/',categoriesController.create);

        this.put('/:id',categoriesController.update);

        this.delete('/:id',categoriesController.eliminate);
    }

}

const categoriesRouter = new CategoriesRouter();

export default categoriesRouter.getRouter();
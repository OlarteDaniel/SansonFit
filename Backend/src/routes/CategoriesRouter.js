import BaseRouter from "./BaseRouter.js";

import categoriesController from "../controllers/categories.controller.js";

class CategoriesRouter extends BaseRouter{

    init(){

        this.get('/',['ADMIN'],categoriesController.getAll);

        this.get('/:id',['ADMIN'],categoriesController.getOne);

        this.post('/',['ADMIN'],categoriesController.create);

        this.put('/:id',['ADMIN'],categoriesController.update);

        this.delete('/:id',['ADMIN'],categoriesController.eliminate);
    }

}

const categoriesRouter = new CategoriesRouter();

export default categoriesRouter.getRouter();
import BaseRouter from "./BaseRouter.js";

import categoriesController from "../controllers/categories.controller.js";

class CategoriesRouter extends BaseRouter{

    init(){

        this.get('/',categoriesController.getAll);

    }

}

const categoriesRouter = new CategoriesRouter();

export default categoriesRouter.getRouter();
import BaseRouter from "./BaseRouter.js";

import productsController from "../controllers/products.controller.js";

class ProductsRouter extends BaseRouter{

    init(){

        this.get('/',productsController.getAll);

        this.get('/:id',productsController.getOne);

        this.post('/',productsController.create);
    }

}

const productsRouter = new ProductsRouter();

export default productsRouter.getRouter();